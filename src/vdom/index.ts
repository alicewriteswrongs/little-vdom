import diff from "./diff"
import render from "./render"
import createStore from "./store"
import { Component } from "./types"

/**
 * Mount takes a component, some starting state, an update function
 * and a DOM element and renders the component, with that state, into
 * that element.
 */
export const mount = <T>(
  component: Component<T>,
  initialState: T,
  updateFunc: (state: T) => T,
  $el: HTMLElement
) => {
  let vapp = component(initialState)

  let $rootEl = render(vapp)
  $el.replaceWith($rootEl)

  const store = createStore(initialState)

  setInterval(() => {
    const newVApp = component(state)
    const patch = diff(vapp, newVApp)
    let patched = patch($rootEl)
    if (patched) {
      $rootEl = patched
    }
    vapp = newVApp
  }, 500) // update the UI every half-second
}
