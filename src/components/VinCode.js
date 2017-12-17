import React from 'react'


const inputStyle = {
  fontSize:   '1rem',
  fontFamily: 'verdana',
  margin:     0,
  padding:    2,
  position:   'absolute',
  left:       0,
  width:      247
}

export const ColoredVinCode = ({ vin }) => {
  const vinStruct = [
    { pos: 0, len: 1, color: '#c32427' },
    { pos: 1, len: 2, color: '#ff0000' },
    { pos: 3, len: 5, color: '#f99400' },
    { pos: 8, len: 1, color: '#89c933' },
    { pos: 9, len: 1, color: '#1baae4' },
    { pos: 10, len: 1, color: '#2d2d94' },
    { pos: 11, len: 6, color: 'darkblue' },
  ]

  return (
    <span style={inputStyle}>
      {vinStruct.map((piece, key) => (
        <span key={key}
              style={{
                color:      piece.color,
                fontSize:   '1rem',
                fontFamily: 'verdana',
                margin:     0,
                padding:    0,
              }}>
          {vin.slice(piece.pos, piece.pos + piece.len)}
        </span>
      ))}
    </span>
  )
}

const footerStyle = {
  color:    'red',
  fontSize: 12,
  margin:   '7px 0 0 5px'
}

const ErrorMessage = ({ text }) =>
  <div style={{ ...footerStyle, color: 'red' }}>
    {text}
  </div>

const LoadingMessage = ({ text }) =>
  <div className="loading" style={{ ...footerStyle, color: 'green' }}>
    {text}
  </div>

export const InputVinCode = ({ loading, loadingText, error, style, vin, onChange, inputRef, hintText, onReset }) => (
  <label style={{ flex: '0 0 253px' }}>
    <span style={{ position: 'relative', height: 24, margin: '0 10px 0 0', ...style }}>
      {vin.length > 0
        ? <ColoredVinCode vin={vin} />
        : <span style={{ ...inputStyle, color: 'lightgray' }}>{hintText}</span>
      }
      <input
        ref={inputRef}
        type="text"
        style={{
          ...inputStyle,
          color:      'transparent',
          background: 'transparent',
          caretColor: 'black',
          border:     '1px solid lightgray'
        }}
        value={vin}
        onKeyDown={e => e.key === 'Escape' && onReset && onReset()}
        onChange={onChange}
      />
    </span>
    {
      loading
        ? <LoadingMessage text={loadingText} />
        : <ErrorMessage text={error} />
    }
  </label>
)
