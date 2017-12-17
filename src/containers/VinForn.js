import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from '../components/Button'
import { InputVinCode } from '../components/VinCode'
import * as VinActions from '../actions/vin'
import vin from '../models/vin'


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
  ({ form, results }) => ({ form, loading: results.isFetching }),
  dispatch => ({
    setVin: bindActionCreators(VinActions.setVin, dispatch),
    decode: bindActionCreators(VinActions.decode, dispatch),
  })
)
export default class VinForm extends Component {
  input = null

  onChange = () => this.input.value.length <= 17 && this.props.setVin(this.input.value)
  decodeVin = () => this.props.decode(this.props.form.vin)

  render() {
    const { form, setVin, loading, style } = this.props
    const valid = vin.validate(form.vin)

    return (
      <div style={{ ...formStyle, ...style }}>
        <InputVinCode
          hintText="Please enter your VIN"
          loading={loading}
          loadingText="Loading..."
          inputRef={node => this.input = node}
          vin={form.vin}
          onChange={this.onChange}
          onReset={() => setVin('')}
          error={form.vin.length === 17 && !valid && 'Invalid VIN code'}
        />

        <Button label="Decode"
                onClick={this.decodeVin}
                disabled={!valid || loading}
        />
      </div>
    )
  }
}
