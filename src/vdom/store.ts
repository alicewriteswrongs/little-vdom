
export default function createStore<T>(initialState: T): Store<T> {
  let state = { ...initialState }

  function createListener(key: string) {
    return state[key]
  }

  function createSetter<V>(key: string) {
    return (newValue: V) {
      let state = {
        ...state,
        [key]: newValue
      }
    }
  }

  function getState (): T {
    // so you can't mutate it!
    return { ...state }
  }

  return {
    createListener,
    createSetter,
    getState
  }
}
