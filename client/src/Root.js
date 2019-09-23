import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import Search from './components/pages/SearchPage/SearchPage'
import Layout from './components/shared/FooterPlusHeader/Layout';
import News from './components/pages/News/News'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Route path='/app' component={App} />
        <Route path='/search' component={Search} />
        <Route path='/news' component={News} />
      </Layout>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root