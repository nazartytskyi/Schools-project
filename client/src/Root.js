import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import MainPage from './components/pages/MainPage/MainPage';
import Search from './components/pages/SearchPage/SearchPage';
import Layout from './components/shared/FooterPlusHeader/Layout';
import News from './components/pages/News/News';
import Vacancies from './components/pages/Vacancies/Vacancies';
import SchoolInfo from './components/pages/SchoolPage/SchoolInfo';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Route path='/main' component={MainPage} />
        <Route path='/app' component={App} />
        <Route path='/search' component={Search} />
        <Route path='/news' component={News} />
        <Route path='/vacancies' component={Vacancies} />
        <Route path='/school' component={SchoolInfo} />
      </Layout>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
