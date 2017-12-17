export const loadState = (storage) => {
  try {
    const serializedState = localStorage.getItem(storage)
    if (serializedState === null) {
      console.error('Empty local storage')
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (error) {
    console.error('Error load store')
    return undefined
  }
}

export const saveState = (storage, state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(storage, serializedState)
  } catch (error) {
    console.error('Error save store')
  }
}

export const clearStorage = () => {
  localStorage.clear()
}
