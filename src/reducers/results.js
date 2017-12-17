import { combineReducers } from 'redux'
import {
  DECODE_VIN_REQUEST,
  DECODE_VIN_SUCCESS,
  DECODE_VIN_FAILURE
} from '../actions/vin'
import {
  RESULT_SET_FILTER,
  RESULT_SORT_ORDER,
} from '../actions/results'


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

const data = (state = {}, action) => {
  switch (action.type) {
    case DECODE_VIN_SUCCESS:
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

const sortBy = (state = 'Variable', action) => {
  switch (action.type) {
    case RESULT_SORT_ORDER:
      return action.payload.sortBy

    default:
      return state
  }
}

const sortOrder = (state = true, action) => {
  switch (action.type) {
    case RESULT_SORT_ORDER:
      return action.payload.sortOrder

    default:
      return state
  }
}

const filter = (state = { varFilter: '', valFilter: '' }, action) => {
  switch (action.type) {
    case RESULT_SET_FILTER:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

export default combineReducers({
  data,
  isFetching,
  lastUpdate,
  sortBy,
  sortOrder,
  filter,
  error
})
