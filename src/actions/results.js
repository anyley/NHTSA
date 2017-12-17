export const
  RESULT_SET_FILTER = 'RESULT_SET_FILTER',
  RESULT_SORT_ORDER = 'RESULT_SORT_ORDER'

export const setFilter = payload => ({
  type: RESULT_SET_FILTER,
  payload
})

export const sortOrder = ({ sortBy, sortOrder }) => ({
  type:    RESULT_SORT_ORDER,
  payload: { sortBy, sortOrder }
})
