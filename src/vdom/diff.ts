import render from "./render"
import {Children, VDOMElement} from "./types"

type Patcher<T> = ($node: T) => HTMLElement | Text | undefined

const replaceSubtree =
  (newNode: VDOMElement): Patcher<HTMLElement | Text> =>
  ($oldNode: HTMLElement | Text) => {
    let $newNode = render(newNode)
    $oldNode.replaceWith($newNode)
    return $newNode
  }

const identityPatch: Patcher<HTMLElement | Text> = ($node) => $node

/**
 * Function to diff two VDOMElements and return a Patcher function which can
 * update the DOM node associated with the old VDOMElement.
 *
 * Patcher functions perform _no check at all_ that the DOM node they are
 * handed actually contains what is contained in the corresponding VDOMElement,
 * since the program assumes that it can be guaranteed sole control of the tree
 * under the root node.
 */
export default function diff(
  oldNode: VDOMElement,
  newNode?: VDOMElement
): Patcher<HTMLElement | Text> {
  if (newNode === undefined) {
    return ($node) => {
      $node.remove()
      return undefined
    }
  }

  if (typeof newNode === "string" || typeof oldNode === "string") {
    if (oldNode !== newNode) {
      return replaceSubtree(newNode)
    } else {
      return identityPatch
    }
  }

  if (oldNode.tagName !== newNode.tagName) {
    return replaceSubtree(newNode)
  }

  const patchAttrs = diffAttrs(oldNode.attrs, newNode.attrs)
  const patchChildren = diffChildren(oldNode.children, newNode.children)

  return ($node) => {
    patchAttrs($node as HTMLElement)
    patchChildren($node as HTMLElement)
    return $node
  }
}

// TODO get proper keys here
type Attrs = Record<string, string>

const diffAttrs =
  (oldAttrs: Attrs, newAttrs: Attrs): Patcher<HTMLElement> =>
  ($node: HTMLElement) => {
    if (JSON.stringify(oldAttrs) !== JSON.stringify(newAttrs)) {
      let differentKeys = Object.keys(newAttrs).filter(
        (key) => oldAttrs[key] === undefined || oldAttrs[key] !== newAttrs[key]
      )

      differentKeys.forEach((key) => {
        $node.setAttribute(key, newAttrs[key])
      })
    }
    return $node
  }

const diffChildren = (
  oldChildren: Children,
  newChildren: Children
): Patcher<HTMLElement> => {
  // copy array so we can use .shift safely
  let newChildrenCopy = newChildren.concat()

  return ($node) => {
    let childPatches: Patcher<HTMLElement | Text>[] = []

    oldChildren.forEach((oldChild) => {
      let newChild = newChildrenCopy.shift()
      childPatches.push(diff(oldChild, newChild))
    })

    Array.from($node.childNodes).forEach((child, idx) => {
      childPatches[idx](child as HTMLElement)
    })

    // we drained the array of all the new children 'matched up' with an old
    // child so all that's left will be new children
    newChildrenCopy.forEach((newChild) => {
      $node.appendChild(render(newChild))
    })
    return $node
  }
}
