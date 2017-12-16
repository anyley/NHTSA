export const loadState = (storage) => {
  try {
    const serializedState = localStorage.getItem(storage)
    if (serializedState === null)
      return undefined
    return JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
}

export const saveState = (storage, state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(storage, serializedState)
  } catch (error) {
    // pass
  }
}

export const clearStorage = () => {
  localStorage.clear()
}
