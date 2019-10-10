import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import SchoolInfo from './SchoolInfo/SchoolInfo';
import SchoolNews from './SchoolNews/SchoolNews';
import SchoolVacancies from './SchoolVacancies/SchoolVacancies';
import SchoolTeachers from './SchoolTeachers/SchoolTeachers';
import axios from 'axios';
import { auth } from '../../shared/firebase-service/firebase-service';
import AddNews from '../../shared/AddNews/AddNews';

const mapStateToProps = state => ({
  schools: state.schools.data
});

class SchoolPage extends Component {
  constructor(props) {
    super(props)
    this.state = {expanded: new Set()};
  }
  handleExpandClick = (SchoolNewsId) => {
    const { expanded } = this.state; 
    !expanded.has(SchoolNewsId) ? expanded.add(SchoolNewsId) : expanded.delete(SchoolNewsId);
    this.setState({expanded: expanded});
  }
  addSchool = (currentSchool) => {
    if (auth().currentUser) {  
       auth()
        .currentUser.getIdToken()
        .then(idToken => {
          axios.post(
            'http://localhost:3001/api/addFavoriteSchool',
            { schoolId: currentSchool._id},
            { headers: { authorization: idToken } }
          );
        });
    }
  };
  render() {
    const schools = this.props.schools || [];
    const {schoolId} = this.props.match.params;
    const currentSchool = schools.find(school => school.id === +schoolId);
    return (
      currentSchool !== undefined ?
      <div>
        <SchoolInfo
          addSchool={this.addSchool}
          currentSchool={currentSchool}
        />
        <Container className='school-news' maxWidth="lg">
          {currentSchool.news.map((item, indexNews) => {
            let SchoolNewsId = `${currentSchool}${indexNews}`;
            return <div key={item.description} >
              <SchoolNews
                item = {item}
                state={this.state} 
                SchoolNewsId={SchoolNewsId}
                handleExpandClick={this.handleExpandClick}
              />
            </div>
          })}
        </Container>
        <aside className='vacancy-card-aside'>
          {currentSchool.vacancies.map((vacancy, index) => {
            let SchoolNewsId = index;
            return <div key={currentSchool.description} >
              <SchoolVacancies
                SchoolNewsId={SchoolNewsId}
                adress={vacancy.adress.title}
                state={this.state}
                vacancy={vacancy}
                handleExpandClick={this.handleExpandClick}
              />
            </div>
          })}
        </aside>
        <section className='teachers-card-section'>
          {currentSchool.teachers ? currentSchool.teachers.map((teacher,indexTeacher) => {
            let SchoolNewsId = indexTeacher;
            return <div key={currentSchool.img} >
              <SchoolTeachers
                teacher={teacher}
                SchoolNewsId={SchoolNewsId}
              />
            </div>
          }) : 'Info missed'}
        </section>
      </div>
      : <CircularProgress className='school-loader' />
    )
  }
}
SchoolPage.propTypes = {
  schools: PropTypes.array,
  addSchool: PropTypes.func
}
export default connect(mapStateToProps,{auth})(SchoolPage);