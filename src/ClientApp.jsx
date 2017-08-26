import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'
import './css/style.scss'

const renderApp = () => {
  render(<Root />, document.getElementById('main'))
}

renderApp()

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    renderApp()
  })
}
