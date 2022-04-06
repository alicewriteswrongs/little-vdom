type Setter<S> = (val: S) => S

/**
 * A simple datastore which we can use to persist values between renders.
 */
export interface Store<State> {
  /**
   * Get a value out of the store!
   *
   * It's probably a better idea to do this rather than using the getState
   * method, but I guess you could just do that too.
   */
  get: <K extends keyof State>(k: K) => State[K]
  /**
   * Set a new value for a given key in the state!
   *
   * In order to avoid problems with callbacks and closure the only way to set
   * a new value is by providing a Setter function, which will be called with
   * the current value under the provided key. The value in the store will be
   * set to whatever is returned by that function.
   */
  set: <K extends keyof State>(k: K, v: Setter<State[K]>) => void
  getState: () => State
}

export default function createStore<T>(initialState: T): Store<T> {
  let state = { ...initialState }

  function get<K extends keyof T>(key: K) {
    return state[key]
  }

  function set<K extends keyof T>(key: K, value: Setter<T[K]>) {
    state[key] = value(state[key])
  }

  function getState(): T {
    return state
  }

  return {
    get,
    set,
    getState,
  }
}
