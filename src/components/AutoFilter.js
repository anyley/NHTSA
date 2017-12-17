import React, { Component } from 'react'


export default class AutoFilter extends Component {
  input = null

  reset = () => {
    this.props.onChange && this.props.onChange('')
  }

  change = event => {
    this.props.onChange && this.props.onChange(this.input.value)
  }

  render() {
    const { style, hint, value } = this.props

    return (
      <div style={{
        position:   'relative',
        height:     '1.4rem',
        fontSize:   '1rem',
        fontFamily: 'verdana',
      }}
      >
        {
          value.length === 0
            ? <span style={{ padding: 2, position: 'absolute', color: 'gray' }}>{hint}</span>
            : null
        }
        <input type="text"
               ref={node => this.input = node}
               style={{
                 fontSize:   '1rem',
                 fontFamily: 'verdana',
                 border:     '1px solid lightgray',
                 padding:    2,
                 position:   'absolute',
                 width:      '100%',
                 background: 'none',
                 ...style
               }}
               onChange={this.change}
               value={value}
               onKeyDown={e => e.key === 'Escape' && this.reset()}
        />
      </div>
    )
  }
}

AutoFilter.filter = (str, tz) => tz.toLowerCase().indexOf(str.toLowerCase()) !== -1
