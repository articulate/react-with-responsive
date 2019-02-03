import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// ENZYME
configure({ adapter: new Adapter() })

// Provide window.matchMedia implementation:
// https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
global.window.matchMedia = jest.fn().mockImplementation(query => ({
  addListener: jest.fn(),
  matches: false,
  media: query,
  onchange: null,
  removeListener: jest.fn()
}))
