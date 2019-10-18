import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container, ExpansionPanel } from '@material-ui/core';
import SchoolInfo from './SchoolInfo/SchoolInfo';
import SchoolNews from './SchoolNews/SchoolNews';
import SchoolVacancies from './SchoolVacancies/SchoolVacancies';
import SchoolTeachers from './SchoolTeachers/SchoolTeachers';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomizedSnackbars from './SchoolInfo/Snackbar';
import { addFavoriteSchool } from '../../../actions/addFavoriteSchool';
import { deleteFavoriteSchool } from '../../../actions/deleteFavoriteSchool';
import './SchoolPage.scss';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  addFavoriteSchool: (schoolId) => dispatch(addFavoriteSchool(schoolId)),
  deleteFavoriteSchool: (schoolId) => dispatch(deleteFavoriteSchool(schoolId))
});

class SchoolPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {expanded: new Set(), isFavorite: false, isSuccess: false, successAdd: false,schools: this.props.schools.data};
  }

  handleExpandClick = (SchoolNewsId) => {
    const { expanded } = this.state; 
    !expanded.has(SchoolNewsId) ? expanded.add(SchoolNewsId) : expanded.delete(SchoolNewsId);
    this.setState({expanded: expanded});
  }
  closeMessage = () => {
    this.setState({...this.state, isSuccess: false, successAdd: false});
  }
  addSchool = (currentSchool) => {
    this.props.addFavoriteSchool(currentSchool._id);
    this.setState({...this.state, isFavorite: true, successAdd: true});
  };
  deleteFavorite = (currentSchool) => {
    this.props.deleteFavoriteSchool(currentSchool._id);
    this.setState({...this.state, isFavorite: false, successAdd: false});
  };
  checkFavorite = (currentSchool) => {
    if(this.props.users.user !== null) {
      this.setState({...this.state, isSuccess: false});
      if(!this.state.isFavorite) {
        this.addSchool(currentSchool);
      } else {
        this.deleteFavorite(currentSchool);
      }
    } else {
      this.setState({...this.state, isSuccess: true, isFavorite: false});
    }
  }
  changeHeart = () => {
    if(this.state.isFavorite) {
      return <FavoriteIcon/>
    } else if(!this.state.isFavorite) {
      return <FavoriteBorderIcon/>
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.schools !== state.schools) {
      return {
        schools: props.schools.data
      };
    }
    return null;
  }

  render() {
    const schools = this.state.schools || [];
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
        <div className='teachers-and-vacancies'>
        <ExpansionPanel className='vacancy-card-aside'>
          <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h2>Вакансії</h2>
          </ExpansionPanelSummary>
          {currentSchool.vacancies.map((vacancy, index) => {
            let Index = index;
            return <div key={vacancy.description } >
              <SchoolVacancies
                Index={Index}
                adress={vacancy.adress}
                state={this.state}
                vacancy={vacancy}
                handleExpandClick={this.handleExpandClick}
                currentSchool={currentSchool}
                vacancyId={vacancy._id}
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
            let IndexTeacher = indexTeacher;
            return <div key={teacher.name} >
              <SchoolTeachers
                teacher={teacher}
                IndexTeacher={IndexTeacher}
                currentSchool={currentSchool}
              />
            </div>
          }) : <CircularProgress className='school-loader' />}
        </ExpansionPanel>
        </div>  
        <CustomizedSnackbars 
          isSuccess={this.state.isSuccess}
          isFavorite={this.state.isFavorite} 
          successAdd={this.state.successAdd}
          closeMessage={this.closeMessage.bind(this)}
        /> 
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
