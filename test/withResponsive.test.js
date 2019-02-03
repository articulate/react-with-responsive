import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import withResponsive from '../source'

const Component = () => <div>Test</div>
const hoc = withResponsive('(min-width: 960px)', 'isDesktop', 'Desktop')
const WrappedComponent = hoc(Component)

describe('withResponsive', () => {

  it('renders', () => {
    const tree = toJson(mount(<WrappedComponent foo="bar" />))
    expect(tree).toMatchSnapshot()
  })

  it('renders, no displayName provided', () => {
    const hocDefault = withResponsive('(min-width: 960px)', 'isDesktop')
    const Comp = hocDefault(Component)
    const tree = toJson(mount(<Comp foo="bar" />))
    expect(tree).toMatchSnapshot()
  })

  describe('componentDidMount', () => {

    it('sets mql property', () => {
      const wrapper = mount(<WrappedComponent foo="bar" />)
      const instance = wrapper.instance()
      expect(instance.mql).toMatchSnapshot()
    })

    it('calls addListener on mql with handleChange', () => {
      const wrapper = mount(<WrappedComponent foo="bar" />)
      const instance = wrapper.instance()
      const addSpy = jest.spyOn(instance.mql, 'addListener')

      expect(addSpy).toHaveBeenCalledWith(instance.handleChange)
    })

    it('calls handleChange', () => {
      const changeSpy = jest.spyOn(WrappedComponent.prototype, 'handleChange')
      mount(<WrappedComponent foo="bar" />)

      expect(changeSpy).toHaveBeenCalledTimes(1)
    })

  })

  describe('componentWillUnmount', () => {

    it('calls removeListener on mql with handleChange', () => {
      const wrapper = mount(<WrappedComponent foo="bar" />)
      const instance = wrapper.instance()
      const removeSpy = jest.spyOn(instance.mql, 'removeListener')

      wrapper.unmount()

      expect(removeSpy).toHaveBeenCalledWith(instance.handleChange)
    })

  })

  describe('handleChange', () => {

    it('sets isDesktop prop to true if mql matches', () => {
      const wrapper = mount(<WrappedComponent foo="bar" />)
      const instance = wrapper.instance()

      instance.mql.matches = true
      instance.handleChange()

      wrapper.update()

      const isDesktop = wrapper.find('Component').prop('isDesktop')
      expect(isDesktop).toBe(true)
    })

  })

})
