import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import withResponsive from '../src'

// example component
const Comp = ({ className, isDesktop }) =>
  <div className={className}>
    {isDesktop ? 'Desktop' : 'Not Desktop'}
  </div>

// usage of withResponsive
const hoc = withResponsive('(min-width: 960px)', 'isDesktop', 'Desktop')
const WrappedComp = hoc(Comp)

class App extends Component {
  render() {
    return (
      <WrappedComp className="foo">
        Testing 123
      </WrappedComp>
    )
  }
}

const container = document.querySelector('[data-app]')
ReactDOM.render(<App />, container)
