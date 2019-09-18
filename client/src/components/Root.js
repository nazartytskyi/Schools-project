import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from '../App'
import Hello from './Hello'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router >
      <Route path="/" component={App} />
      <Route path='/hi' component={Hello}/>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root