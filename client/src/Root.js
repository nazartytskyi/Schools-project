import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import Hello from './Hello'
import Header from './shareable/header/Header'
import Footer from './shareable/footer/Footer'
import Search from './pages/SearchPage/SearchPage'
import TestApp from './pages/TestApp/TestApp'
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path='/' component={Header} />
      <Route path='/app' component={App} />
      <Route path='/hi' component={Hello} />
      <Route path='/' component={Footer} />
      <Route path='/search' component={Search} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root