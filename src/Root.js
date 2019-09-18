import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import Hello from './Hello'
import Header from './components/shareable/header/Header'
import Footer from './components/shareable/footer/Footer'
//import Search from './components/pages/search/Search'
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path='/' component={Header} />
      <Route path='/app' component={App} />
      <Route path='/hi' component={Hello} />
      <Route path='/' component={Footer} />
      {/* <Route path='/search' component={Search} /> */}
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root