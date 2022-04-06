import { VDOMElement, VDOMNode } from "./types"

function renderElem(vNode: VDOMNode): HTMLElement {
  const $el = document.createElement(vNode.tagName)

  console.log(vNode)

  Object.entries(vNode.attrs ?? {}).forEach(([k, v]) => {
    $el.setAttribute(k, v)
  })

  vNode.children.forEach((child) => {
    $el.appendChild(render(child))
  })

  return $el
}

const render = (node: VDOMElement) =>
  typeof node === "string" ? document.createTextNode(node) : renderElem(node)

export default render
