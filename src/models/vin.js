const VIN_LENGTH = 17

const transliterate = char => '0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ'.indexOf(char) % 10

const getCheckDigit = vin => {
  const map = '0123456789X'
  const weights = '8765432X098765432'
  let sum = 0
  for (let i = 0; i < VIN_LENGTH; ++i) {
    sum += transliterate(vin.charAt(i)) * map.indexOf(weights.charAt(i))
  }
  return map.charAt(sum % 11)
}

const validate = vin => {
  if (vin.length !== 17) return false

  return getCheckDigit(vin) === vin.charAt(8)
}

export default {
  VIN_LENGTH,
  validate
}
