import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import Hello from './Hello'
import Header from './shareable/header/Header'
import Footer from './shareable/footer/Footer'
import Search from './pages/SearchPage/SearchPage'
import News from './shareable/News/News'
import Layout from './shareable/HOC/Layout';
import LayoutNoWrap from './shareable/HOC/LayoutNoWrap';


const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Layout>
      {/* <Route path='/landing' component={Header} /> */}
        <Route path='/app' component={App} />
        <Route path='/hi' exact component={Hello} />
        <Route path='/search' component={Search} />
        <Route   path='/news' component={News} />
      </Layout>:
      
      {/* <Route path='/landing' component={Footer} /> */}
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root