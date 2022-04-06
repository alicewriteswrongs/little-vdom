import { Children, VDOMNode } from "./types"

export interface VDOMOptions {
  attrs?: Record<string, any>
  children?: Children
  afterELCreate?: any
}

export default (tagName: string, options: VDOMOptions = {}): VDOMNode => {
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
