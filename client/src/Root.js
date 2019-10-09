import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import Search from './components/pages/SearchPage/SearchPage'
import Layout from './components/shared/FooterPlusHeader/Layout';
import News from './components/pages/News/News';
import Vacancies from './components/pages/Vacancies/Vacancies';
import SchoolInfo from './components/pages/SchoolPage/SchoolInfo';
import Unauthorized from './components/shared/Error/Unauthorized';
import Forbidden from './components/shared/Error/Forbidden';
import AddNews from './components/shared/AddNews/AddNews';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Route path='/app' component={App} />
        <Route path='/search' component={Search} />
        <Route path='/news' component={News} />
        <Route path='/vacancies' component={Vacancies} />
        <Route path='/school' component={SchoolInfo} />
        <Route path='/error/401' component={Unauthorized} />
        <Route path='/error/403' component={Forbidden} />
        <Route path='/hi' component={AddNews} />
      </Layout>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
