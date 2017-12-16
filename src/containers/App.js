import React, { Component } from 'react'
import { connect } from 'react-redux'


@connect(({ test }) => ({ test }))
export default class App extends Component {
  render() {
    return (
      <div>
        NHTSA
      </div>
    )
  }
}
