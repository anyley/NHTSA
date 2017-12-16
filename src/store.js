import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import throttle from 'lodash/throttle'
import { clearStorage, loadState, saveState } from './localStorage'
import { api } from './api'
import reducers from './reducers'


export const initStore = () => {
  let STORAGE_VERSION = 'v.1.0.0'

  const persistedState = loadState(STORAGE_VERSION)

  if (!persistedState) {
    clearStorage()
  }

  const middlware = [
    thunk.withExtraArgument({ api })
  ]

  const store = createStore(
    reducers,
    persistedState,
    composeWithDevTools(
      applyMiddleware(...middlware)
    )
  )


  ENV !== 'test' && store.subscribe(throttle(() => {
    const currentState = store.getState()
    saveState(global.STORAGE_VERSION, currentState)
  }, 1000))

  return store
}
