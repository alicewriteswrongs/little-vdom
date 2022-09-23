import { Children, VDOMNode } from "./types"

/**
 * Create a virtual DOM node
 *
 * This function is designed to be called as a virtual DOM node factory from
 * JSX.
 */
export default function createElement(
  tagName: string,
  attrs?: Record<string, any>,
  ...children: Children
): VDOMNode {
  attrs = attrs ?? {}
  children = (children ?? []).map((child) =>
    typeof child === "string" ||
    typeof child === "number" ||
    typeof child === "boolean"
      ? String(child)
      : child
  )

  return {
    tagName,
    attrs,
    children,
  }
}
