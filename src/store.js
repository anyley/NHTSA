import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import throttle from 'lodash/throttle'
import { clearStorage, loadState, saveState } from './localStorage'
import api from './api'
import reducers from './reducers'


export const STORAGE_VERSION = 'NHTSA v1.0.0'

export const initStore = () => {
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


  store.subscribe(throttle(() => {
    const currentState = store.getState()
    saveState(STORAGE_VERSION, {
      ...currentState
    })
  }, 1000))

  store.dispatch({ type: 'INITIALIZE' })

  return store
}
