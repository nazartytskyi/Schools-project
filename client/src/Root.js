import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './components/pages/MainPage/MainPage';
import Search from './components/pages/SearchPage/SearchPage';
import Layout from './components/shared/FooterPlusHeader/Layout';
import News from './components/pages/News/News';
import Vacancies from './components/pages/Vacancies/Vacancies';
import SchoolPage from './components/pages/SchoolPage/SchoolPage';
import Unauthorized from './components/shared/Error/Unauthorized';
import Forbidden from './components/shared/Error/Forbidden';
import Profile from './components/pages/Profile/Profile';
import Contacts from './components/pages/Contacts/Contacts';
import AboutUs from './components/pages/AboutUs/AboutUs';
import FavSchoolsPage from './components/pages/FavSchoolsPage/FavSchoolsPage';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Route exact path="/" component={MainPage} />
        <Route path="/search" component={Search} />
        <Route path="/news" component={News} />
        <Route path="/vacancies" component={Vacancies} />
        <Route path="/school/:schoolId" component={SchoolPage} />
        <Route path="/error/401" component={Unauthorized} />
        <Route path="/error/403" component={Forbidden} />
        <Route path="/profile" component={Profile} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/about" component={AboutUs} />
        <Route path="/fav" component={FavSchoolsPage} />
      </Layout>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
