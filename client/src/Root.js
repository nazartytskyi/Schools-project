import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import Header from './components/shared/header/Header'
import Footer from './components/shared/footer/Footer'
import Search from './components/pages/SearchPage/SearchPage'
import Vacancies from './components/pages/Vacancies/Vacancies'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path='/' component={Header} />
      <Route path='/app' component={App} />
      <Route path='/' component={Footer} />
      <Route path='/search' component={Search} />
      <Route path='/vacancies' component={Vacancies} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root