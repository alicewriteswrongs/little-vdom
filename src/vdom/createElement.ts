import { Children, VDOMElement } from "./types"

export interface VDOMOptions {
  attrs?: Record<string, any>
  children?: Children
}

export default (tagName: string, options: VDOMOptions = {}): VDOMElement => {
  const children = options.children ?? []
  const attrs = options.attrs ?? {}
  return {
    tagName,
    attrs,
    children,
  }
}
