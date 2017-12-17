import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from '../components/Button'
import { InputVinCode } from '../components/VinCode'
import * as VinActions from '../actions/vin'


const transliterate = char => '0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ'.indexOf(char) % 10

const getCheckDigit = vin => {
  const map = '0123456789X'
  const weights = '8765432X098765432'
  let sum = 0
  for (let i = 0; i < 17; ++i) {
    sum += transliterate(vin.charAt(i)) * map.indexOf(weights.charAt(i))
  }
  return map.charAt(sum % 11)
}

const validate = vin => {
  if (vin.length !== 17) return false

  return getCheckDigit(vin) === vin.charAt(8)
}


const formStyle = {
  padding:        20,
  border:         '1px solid lightgray',
  display:        'flex',
  justifyContent: 'center',
  flexFlow:       'row nowrap',
  minWidth:       400,
  height:         28
}

@connect(
  ({ form }) => ({ form }),
  dispatch => ({
    setVin: bindActionCreators(VinActions.setVin, dispatch),
    decode: bindActionCreators(VinActions.decode, dispatch),
  })
)
export default class App extends Component {
  input = null

  onChange = () => {
    if (this.input.value.length <= 17) {
      this.props.setVin(this.input.value)
    }
  }

  decodeVin = () => {
    const { form: { vin }, decode } = this.props
    console.log('decode', vin)
    decode(vin)
  }

  render() {
    const { form, setVin } = this.props
    const valid = validate(form.vin)

    return (
      <div>
        <div style={formStyle}>
          <InputVinCode
            hintText="Please enter your VIN"
            inputRef={node => this.input = node}
            vin={form.vin}
            onChange={this.onChange}
            onReset={() => setVin('')}
            error={form.vin.length === 17 && !valid && 'Invalid VIN code'}
          />

          <Button label="Decode"
                  onClick={this.decodeVin}
                  disabled={!valid}
          />
        </div>

        <div>
          table
        </div>
      </div>
    )
  }
}
