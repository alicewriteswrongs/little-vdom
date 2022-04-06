import { mount } from "./vdom"
import createElement from "./vdom/createElement"
import { Component } from "./vdom/types"

const testComponent: Component<State> = (store) => {
  const count = store.get("count")

  return createElement("div", {
    attrs: {
      id: "app",
      dataCount: count,
    },
    children: [
      String(count),
      createElement("button", {
        attrs: {},
        afterELCreate: (node) => {
          node.addEventListener("click", (event: MouseEvent) => {
            event.preventDefault()
            store.set("count", (count) => count + 1)
          })
        },
        children: ["Click to increment"],
      }),
      createElement("img", {
        attrs: {
          src: "https://media2.giphy.com/media/8vQSQ3cNXuDGo/giphy.gif?cid=ecf05e47d67w1o8v2nuep75gmqu98xcvosxkb2qly1956h61&rid=giphy.gif&ct=g",
        },
      }),
    ],
  })
}

interface State {
  count: number
}

let $el = document.getElementById("app")
if ($el) {
  mount(testComponent, { count: 0 }, $el)
}
