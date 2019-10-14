import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container, ExpansionPanel } from '@material-ui/core';
import SchoolInfo from './SchoolInfo/SchoolInfo';
import SchoolNews from './SchoolNews/SchoolNews';
import SchoolVacancies from './SchoolVacancies/SchoolVacancies';
import SchoolTeachers from './SchoolTeachers/SchoolTeachers';
import { auth } from '../../shared/firebase-service/firebase-service';
import {currentUser} from '../../shared/firebase-service/firebase-service';
import  Carousel  from '../../shared/Carousel/Carousel';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { addFavoriteSchool } from '../../../actions/addFavoriteSchool';
import { deleteFavoriteSchool } from '../../../actions/deleteFavoriteSchool';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  addFavoriteSchool: (schoolId) => dispatch(addFavoriteSchool(schoolId)),
  deleteFavoriteSchool: (schoolId) => dispatch(deleteFavoriteSchool(schoolId))
});

class SchoolPage extends Component {
  constructor(props) {
    super(props)
    this.state = {expanded: new Set(),isFavorite: false};
  }

  handleExpandClick = (SchoolNewsId) => {
    const { expanded } = this.state; 
    !expanded.has(SchoolNewsId) ? expanded.add(SchoolNewsId) : expanded.delete(SchoolNewsId);
    this.setState({expanded: expanded});
  }
  addSchool = (currentSchool) => {
    this.props.addFavoriteSchool(currentSchool._id);
    this.setState({...this.state, isFavorite: true});
  };
  deleteFavorite = (currentSchool) => {
    this.props.deleteFavoriteSchool(currentSchool._id);
    this.setState({...this.state, isFavorite: false});
  };
  checkFavorite = (currentSchool) => {
    if(this.props.users.user !== null) {
      if(!this.state.isFavorite) {
        this.addSchool(currentSchool)
      } else {
        this.deleteFavorite(currentSchool)
      }
    } else {
      alert('Login pls');  
    }
  }
  changeHeart = () => {
    if(this.state.isFavorite) {
      return <FavoriteIcon/>
    } else if(!this.state.isFavorite) {
      return <FavoriteBorderIcon/>
    }
  }
  render() {
    const schools = this.props.schools.data || [];
    const {schoolId} = this.props.match.params;
    const currentSchool = schools.find(school => school.id === +schoolId);
    return (
      currentSchool !== undefined ?
      <div>
        <SchoolInfo
          checkFavorite={this.checkFavorite}  
          changeHeart={this.changeHeart}
          currentSchool={currentSchool}
          state={this.state}
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
        <ExpansionPanel className='vacancy-card-aside'>
          <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h2>Вакансії</h2>
          </ExpansionPanelSummary>
          {currentSchool.vacancies.map((vacancy, index) => {
            let SchoolNewsId = index;
            return <div key={vacancy.description } >
              <SchoolVacancies
                SchoolNewsId={SchoolNewsId}
                adress={vacancy.adress.title}
                state={this.state}
                vacancy={vacancy}
                handleExpandClick={this.handleExpandClick}
              />
            </div>
          })}
        </ExpansionPanel>
        <ExpansionPanel className='teachers-card-section'>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h2>Вчителі</h2>
          </ExpansionPanelSummary>
          {currentSchool.teachers ? currentSchool.teachers.map((teacher,indexTeacher) => {
            let SchoolNewsId = indexTeacher;
            return <div key={teacher.name} >
              <SchoolTeachers
                teacher={teacher}
                SchoolNewsId={SchoolNewsId}
              />
            </div>
          }) : 'Info missed'}
        </ExpansionPanel>
      </div>
      : <CircularProgress className='school-loader' />
    )
  }
}
SchoolPage.propTypes = {
  schools: PropTypes.object,
  addSchool: PropTypes.func
}
export default connect(mapStateToProps, mapDispatchToProps)(SchoolPage);
