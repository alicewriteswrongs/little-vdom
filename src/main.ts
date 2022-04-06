import { mount } from './vdom'
import createElement from './vdom/createElement'

const testComponent = (count: number) => createElement('div', {
  attrs: {
    id: 'app',
    dataCount: count
  }, 
  children: [
    String(count),
    createElement('img', {
      attrs: {
        src: "https://media2.giphy.com/media/8vQSQ3cNXuDGo/giphy.gif?cid=ecf05e47d67w1o8v2nuep75gmqu98xcvosxkb2qly1956h61&rid=giphy.gif&ct=g"
      }
    })
  ]
  }
)

let $el = document.getElementById('app')
if ($el) {
  mount(
    testComponent,
    0 as number,
    count => count+1,
    $el
  )
}
