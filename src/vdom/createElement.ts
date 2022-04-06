import { Children, VDOMNode } from "./types"

/**
 * The options you can pass in to createElement when you're creating a VDOMNode.
 *
 * This covers basically attrs you'd like to be on the mounted HTMLElement,
 * children, and an optional callback that will be called with the element after it
 * is created (useful for attaching click handlers, since I haven't come up with a better
 * way to do that yet).
 */
export interface VDOMOptions {
  attrs?: Record<string, any>
  children?: Children
  afterELCreate?: <T extends HTMLElement>(el: T) => void
}

export default function createElement(
  tagName: string,
  options: VDOMOptions = {}
): VDOMNode {
  const children = options.children ?? []
  const attrs = options.attrs ?? {}
  const afterELCreate = options.afterELCreate

  return {
    tagName,
    attrs,
    children,
    afterELCreate,
  }
}
