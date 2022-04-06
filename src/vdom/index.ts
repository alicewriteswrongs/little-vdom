import diff from "./diff"
import render from "./render"
import createStore from "./store"
import { Component } from "./types"

/**
 * Mount takes a component, some starting state, and a DOM element and renders
 * the component, with that state, into that element.
 */
export const mount = <State>(
  component: Component<State>,
  initialState: State,
  $el: HTMLElement
) => {
  const store = createStore(initialState)
  let vapp = component(store)

  let $rootEl = render(vapp)
  $el.replaceWith($rootEl)

  function rerender() {
    const newVApp = component(store)
    const patch = diff(vapp, newVApp)
    let patched = patch($rootEl)
    if (patched) {
      $rootEl = patched
    }
    vapp = newVApp
  }

  setInterval(rerender, 100)
}
