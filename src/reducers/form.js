import { combineReducers } from 'redux'
import { SET_VIN } from '../actions/vin'


const vin = (state = 'JTDKN36U101299157', action) => {
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
