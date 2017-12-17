import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from '../components/Button'
import AutoFilter from '../components/AutoFilter'
import * as ResultsActions from '../actions/results'
import vin from '../models/vin'


const rootStyle = {
  marginTop: 20,
  padding:   0,
  minWidth:  400,
}


const getRowStyle = ({ stripe }) => ({
  display:         'flex',
  justifyContent:  'flex-start',
  alignItems:      'flex-start',
  flexFlow:        'row nowrap',
  backgroundColor: stripe ? '#f2fff2' : 'transparent',
  height:          '28px'
})

const Row = ({ style, children, ...props }) =>
  <div style={{ ...getRowStyle(props), ...style }}>
    {children}
  </div>


const getColumnStyle = ({ border = 'none', align = 'left', autofit = false, width = 'auto' }) => ({
  flex:      `${autofit ? 1 : 0} ${autofit ? 1 : 0} ${width}`,
  border:    `1px solid ${border}`,
  //boxSizing: 'border-box',
  textAlign: align,
  padding:   '5px 10px',
  position:  'relative'
})

const Column = ({ style, children, onClick, ...props }) =>
  <div style={{ ...getColumnStyle(props), ...style }} onClick={onClick}>
    {children}
  </div>


const sortButtonStyle = {
  position: 'absolute',
  right:    6,
}

const SortButton = ({ sortOrder = true }) =>
  sortOrder
    ? <span style={sortButtonStyle}>&#9650;</span>
    : <span style={sortButtonStyle}>&#9660;</span>


const headerStyle = { cursor: 'pointer', userSelect: 'none' }

@connect(
  ({ form, results }) => ({ form, results }),
  dispatch => ({
    setFilter: bindActionCreators(ResultsActions.setFilter, dispatch),
    sortOrder: bindActionCreators(ResultsActions.sortOrder, dispatch),
  })
)
export default class Results extends Component {
  changeSortOrder = column => {
    const { results: { sortOrder, sortBy } } = this.props
    this.props.sortOrder({ sortBy: column, sortOrder: sortBy === column ? !sortOrder : sortOrder })
  }

  render() {
    const { form, results, style, setFilter } = this.props
    const { filter, sortBy, sortOrder } = results
    const dataExists = results && results.cache[form.vin]
    const data = results.cache[form.vin]

    return (
      <div style={{ ...rootStyle, ...style }}>
        <Row style={{ backgroundColor: '#0da15d', color: 'white', fontWeight: 'bold' }}>
          <Column
            style={headerStyle}
            width="300px"
            autofit={false}
            align="center"
            border="white"
            onClick={() => this.changeSortOrder('Variable')}
          >
            Variable
            {sortBy === 'Variable' ? <SortButton sortOrder={sortOrder} /> : null}
          </Column>
          <Column
            style={headerStyle}
            autofit
            align="center"
            border="white"
            onClick={() => this.changeSortOrder('Value')}
          >
            Value
            {sortBy === 'Value' && <SortButton sortOrder={sortOrder} />}
          </Column>
        </Row>

        <Row>
          <Column width="314px"
                  autofit={false}
                  align="left"
                  border="white"
                  style={{ padding: 0 }}
          >
            <AutoFilter
              hint="Enter variable name"
              value={filter.varFilter}
              onChange={value => setFilter({ varFilter: value })}
            />
          </Column>
          <Column autofit
                  align="left"
                  border="white"
                  style={{
                    padding:     0,
                    marginLeft:  6,
                    marginRight: 6
                  }}
          >
            <AutoFilter
              hint="Enter value"
              value={filter.valFilter}
              onChange={value => setFilter({ valFilter: value })}
            />
          </Column>
        </Row>

        {
          dataExists &&
          data
            .filter(({ Variable, Value }) =>
              Variable && Value &&
              AutoFilter.filter(filter.varFilter, Variable) &&
              AutoFilter.filter(filter.valFilter, Value)
            )
            .sort((a, b) => sortOrder
                ? a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1
                : a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? 1 : -1
            )
            .map(({ Variable, Value }, idx) =>
              <Row key={idx} stripe={idx % 2 !== 0}>
                <Column width="300px" align="right">
                  {Variable}
                </Column>
                <Column autofit>
                  {Value}
                </Column>
              </Row>
            )
        }
      </div>
    )
  }
}
