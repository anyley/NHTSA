import { combineReducers } from 'redux'
import { SET_VIN } from '../actions/vin'


const vin = (state = '', action) => {
  switch(action.type) {
    case SET_VIN:
      return action.payload

    default:
      return state
  }
}


export default combineReducers({
  vin
})
