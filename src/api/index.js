const URL = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/'

const getParams = params =>
  Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&')

const decode = async (vin) => {
  const response = await fetch(URL + vin + '?' + getParams({
    format: 'json',
  }))

  if (response.ok) {
    const result = await response.json()
    return result.Results
  } else {
    throw response
  }
}

export default {
  decode
}
