import React, { PureComponent } from 'react'
import memoizeOne from 'memoize-one'

const match = memoizeOne(window.matchMedia)

const withResponsive = (...params) => Comp => {
  const [ query, identifier, displayName='Responsive' ] = params

  class Responsive extends PureComponent {
    constructor(...params) {
      super(...params)
      this.handleChange = this.handleChange.bind(this)
      this.state = { isMatch: false }
    }

    componentDidMount() {
      this.mql = match(query)
      this.mql.addListener(this.handleChange)

      this.handleChange()
    }

    componentWillUnmount() {
      this.mql.removeListener(this.handleChange)
    }

    handleChange() {
      this.setState({ isMatch: this.mql.matches })
    }

    render() {
      const { props, state: { isMatch } } = this

      return (
        <Comp
          {...props}
          {...{ [identifier]: isMatch }}
        />
      )
    }
  }
  const name = Comp.displayName || Comp.name
  Responsive.displayName = `${displayName}(${name})`
  return Responsive
}

export default withResponsive
