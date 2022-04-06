import { Store } from "./store"

export type Children = VDOMElement[]

/**
 * A VDOMNode is an non-text element in our virtual DOM, so something that will
 * end up rendering out as an HTML element of some kind. These should typically
 * not be created manually, but by using createElement.
 */
export interface VDOMNode {
  tagName: string
  attrs: Record<string, string>
  children: Children
  afterELCreate: any
}

/**
 * An element in our vdom tree is either a VDOMNode or a String (which will be
 * rendered to the DOM using document.createTextNode)
 */
export type VDOMElement = string | VDOMNode

/**
 * A Component is a function which takes in props and returns a VDOMElement. Typically
 * this will be done by returning the result of a call to createElement.
 */
export type Component<T> = (store: Store<T>) => VDOMElement
