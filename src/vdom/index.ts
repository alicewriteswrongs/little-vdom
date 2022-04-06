import diff from "./diff"
import render from "./render"
import { Component } from "./types"

export const mount = <T>(
  component: Component<T>,
  initialState: T,
  updateFunc: (state: T) => T,
  $el: HTMLElement
) => {
  let vapp = component(initialState)

  let $rootEl = render(vapp)
  $el.replaceWith($rootEl)

  let state = initialState

  setInterval(() => {
    state = updateFunc(state)
    const newVApp = component(state)
    const patch = diff(vapp, newVApp)
    let ret = patch($rootEl)
    if (ret) {
      $rootEl = ret
    }
    vapp = newVApp
  }, 500) // update the UI every half-second
}
