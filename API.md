# API Documentation

## Installation
```
$ npm i react-with-responsive
```

or

```
$ yarn add react-with-responsive
```

## Usage
The `withResponsive` function is a [higher-order
component](https://reactjs.org/docs/higher-order-components.html) and accepts
two sets of curried arguments:
  * options (up to 3 parameters; more on this below)
  * the component being wrapped

```js
import withResponsive from 'react-with-responsive'

// example component
const Comp = ({ className, isDesktop }) =>
  <div className={className}>
    {isDesktop ? 'Desktop' : 'Not Desktop'}
  </div>

// usage of withResponsive
const hoc =
  withResponsive('(min-width: 960px)', 'isDesktop', 'Desktop')

export default hoc(Comp)
```

### Options
The first three arguments to `withResponsive` must all be applied at the same
time for they are not curried. While the first two are required, the third is
optional:
1. media query such as `'(min-width: 960px)'`
1. property name to use for the Boolean result; e.g., `isDesktop`, `isMin960`
1. optional `displayName` wrapper to use; defaults to `Responsive`

### Composing Multiple `withResponsive` Components
If you want to have multiple listeners for one component, that's easy! The
cleanest way to do this is with [ramda's compose
function](https://ramdajs.com/docs/#compose) or with [crocks'
compose](https://evilsoft.github.io/crocks/docs/functions/helpers.html#compose).

```js
import withResponsive from 'react-with-responsive'
import compose from 'ramda/src/compose'

// example component
const Comp = ({ isDesktop, isSmallish }) =>
  <div>
    {isDesktop && <span>Desktop here!</span>}
    {isSmallish && <span>Smallish here!</span>}
    {!isDesktop && !isSmallish && <span>In between smallish & desktop!</span>}
  </div>

// usage of withResponsive
const hoc =
  compose(
    withResponsive('(min-width: 960px)', 'isDesktop', 'Desktop')
    withResponsive('(max-width: 768px)', 'isSmaller', 'Smallish')
  )

export default hoc(Comp)
