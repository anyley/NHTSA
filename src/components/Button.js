import React, { Component } from 'react'


export class Button extends Component {
  state = {
    hover: false
  }

  render() {
    const { label, onClick, style, disabled } = this.props

    return (
      <div
        style={{
          border:          'none', //'1px solid lightgray',
          height:          '22px',
          padding:         '2px 15px',
          backgroundColor: disabled
                             ? 'lightgray'
                             : this.state.hover ? '#00cf00' : '#00be00',
          color:           disabled ? 'darkgray' : 'white',
          userSelect:      'none',
          cursor:          'pointer',
          transition:      'background-color .1s ease-in',
          ...style
        }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        onClick={onClick}
      >
        {label}
      </div>
    )
  }
}
