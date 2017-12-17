import api from '../api'


export const
  SET_VIN            = 'SET_VIN',
  DECODE_VIN_REQUEST = 'DECODE_VIN_REQUEST',
  DECODE_VIN_SUCCESS = 'DECODE_VIN_SUCCESS',
  DECODE_VIN_FAILURE = 'DECODE_VIN_FAILURE'


export const setVin = payload => ({
  type: SET_VIN,
  payload
})

export const decodeRequest = vin => ({
  type:    DECODE_VIN_REQUEST,
  payload: vin
})

export const decodeSuccess = (result, requestParams) => ({
  type:    DECODE_VIN_SUCCESS,
  meta:    { requestParams },
  payload: result
})

export const decodeFailure = (vin, requestParams) => ({
  type:    DECODE_VIN_FAILURE,
  error:   true,
  meta:    { requestParams },
  payload: vin
})


export const decode = vin => async (dispatch, getState, { api }) => {
  dispatch(decodeRequest(vin))

  try {
    const result = await api.decode(vin)
    dispatch(decodeSuccess(result, vin))
  } catch(e) {
    dispatch(decodeFailure(e, vin))
  }
}
