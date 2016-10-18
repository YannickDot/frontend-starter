// @flow
import React from 'react' // eslint-disable-line no-unused-vars
import {render} from 'react-dom'

import {App} from './TestComponent.js' // eslint-disable-line no-unused-vars

let n = window.prompt(`What's your name ?`)

render(
  <App name={n}/>,
  document.querySelector('#root')
)
