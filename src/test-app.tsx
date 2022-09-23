import { mount } from "./vdom"
import createElement from "./vdom/createElement"
import { Component } from "./vdom/types"

const testComponent: Component<State> = (store) => {
  const count = store.get("count")
  return (
    <div id="app" dataCount={count}>
      {count}
      <button
        onclick={(event: MouseEvent) => {
          event.preventDefault()
          store.set("count", (count) => count + 1)
        }}
      >
        Click to increment
      </button>
      <img src="https://media2.giphy.com/media/8vQSQ3cNXuDGo/giphy.gif?cid=ecf05e47d67w1o8v2nuep75gmqu98xcvosxkb2qly1956h61&rid=giphy.gif&ct=g" />
    </div>
  )
}

interface State {
  count: number
}

let $el = document.getElementById("app")
if ($el) {
  mount(testComponent, { count: 0 }, $el)
}
