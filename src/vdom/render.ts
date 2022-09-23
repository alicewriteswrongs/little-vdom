import { VDOMElement, VDOMNode } from "./types"

/**
 * To handle rendering VDOMNodes - these will be transformed into an HTML
 * element, including handling their children.
 */
function renderElem(vNode: VDOMNode): HTMLElement {
  const $el = document.createElement(vNode.tagName)

  Object.entries(vNode.attrs ?? {}).forEach(([k, v]) => {
    if (k === "onclick") {
      $el.onclick = v
    } else {
      $el.setAttribute(k, v)
    }
  })

  vNode.children.forEach((child) => {
    $el.appendChild(render(child))
  })

  return $el
}

/**
 * Render a vdom node (including it's children) to something ready to be
 * inserted into the DOM. For a VDOMNode this would be an HTMLElement, but
 * for a String it will be, well, a string.
 */
const render = (node: VDOMElement) =>
  typeof node === "string" ? document.createTextNode(node) : renderElem(node)

export default render
