import { combineReducers } from 'redux'
import {
  DECODE_VIN_REQUEST,
  DECODE_VIN_SUCCESS,
  DECODE_VIN_FAILURE
} from '../actions/vin'


const isFetching = (state = false, action) => {
  switch (action.type) {
    case DECODE_VIN_REQUEST:
      return true

    case DECODE_VIN_FAILURE:
    case DECODE_VIN_SUCCESS:
      return false

    default:
      return state
  }
}

const lastUpdate = (state = -1, action) => {
  if (action.type === DECODE_VIN_SUCCESS) {
    return +new Date
  } else {
    return state
  }
}

const data = (state = '', action) => {
  switch (action.type) {
    case DECODE_VIN_REQUEST:
      return action.payload

    case DECODE_VIN_SUCCESS:
      return action.payload

    case DECODE_VIN_FAILURE:
      return action.payload

    default:
      return state
  }
}

const error = (state = {}, action) => {
  switch (action.type) {
    case DECODE_VIN_REQUEST:
    case DECODE_VIN_SUCCESS:
      return {}

    case DECODE_VIN_FAILURE:
      return action.payload

    default:
      return state
  }
}

export default combineReducers({
  data,
  isFetching,
  lastUpdate,
  error
})
