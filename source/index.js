import React, { PureComponent } from 'react'

const withResponsive = (
  query,
  identifier,
  displayName='Responsive'
) => Comp => {
  class Responsive extends PureComponent {
    constructor(...params) {
      super(...params)
      this.handleChange = this.handleChange.bind(this)
      this.state = { isMatch: false }
    }

    componentDidMount() {
      this.mql = window.matchMedia(query)
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
