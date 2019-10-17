import React, { Component } from 'react';
import './AddVacancy.scss';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {addNewsAction} from '../../../actions/addNewsAction';
import CustomizedSnackbars from '../AddNews/SuccessAlert';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {addVacancy} from '../../../actions/addVacancy';

const mapStateToProps = state => ({
  schools: state.schools.data,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  addVacancy: (obj, id) => {
    return dispatch(addVacancy(obj, id));
  }
});

 class AddVacancy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpened: false, 
      title: null,
      description: null,
      salary: null,
      employment: 'Повна зайнятість',
      date: null,
      isSuccess: false,
      isFormFilled: true,
      fileName: ''
    };
  }

  openDialog = () => {
    this.setState({...this.state, isDialogOpened: true});
  }

  closeDialog = () => {
    this.setState({...this.state, isDialogOpened: false, isFormFilled: true});
  }

 closeMessage = () => {
  this.setState({...this.state, isSuccess: false});
 }

  getCurrentDate = () => {
    if(this.state.date !== null) {
      let year = this.state.date.getFullYear()
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                      'August', 'September', 'October', 'November', 'December'];
      let month = this.state.date.getMonth() + 1;
     if(month > 10) {
       month = '0'+ month;
     }
      let day = this.state.date.getDate();
      return `${year}-${month}-${day}`;
    }
  }

 

  updatePostInput = (e) => {
    if(e.target.value === '')
    this.setState({...this.state, title: e.target.value, date: new Date()});
    console.log(this.props.currentSchool._id);
  }

  updateSalaryInput = (e) => {
    this.setState({...this.state, salary: e.target.value});
    console.log(this.props.currentSchool._id);
  }

  updateTextarea = (e) => {
    this.setState({...this.state, description: e.target.value});
  }

  changeEmployment = (e) => {
    this.setState({...this.state, employment: e.target.value});
  }


  displayMessage = () => {
    if(this.state.isFormFilled) {
      return {visibility: 'hidden', marginTop: '20px'}
    }
    return {visibility: 'visible', marginTop: '20px'}
  }

  addVacancy = (e) => {
    e.preventDefault();
    this.setState({...this.state, isSuccess: false});

    if(this.state.title !== null && 
      this.state.description !== null && 
      this.state.salary !== null) {

        let obj = {
          title: this.state.title,
          description: this.state.description,
          salary: this.state.salary,
          employment: this.state.employment,
          date: this.getCurrentDate()
        }
        
        this.props.addVacancy(obj, this.props.currentSchool._id);
        this.setState({
          ...this.state, 
          isDialogOpened: false, 
          isSuccess: true, 
          title: null, 
          description: null, 
          salary: null,
          date: null
        });
      
    } else {
      this.setState({...this.state, isFormFilled: false});
    }
  };

  displayForm = () => {
    if(this.state.isDialogOpened) {
      return (
        <Dialog open={true} >
          <form onSubmit={this.addVacancy} className="dialog-form">
            <Typography variant="h5">Додати вакансію</Typography>
            <div className="dialog-field">
              <TextField
                id="outlined-with-placeholder"
                label="Посада"
                variant="outlined"
                onChange={this.updatePostInput}
                className="dialog-field-input"
              />
            </div>
            <div className="dialog-field">
              <TextField
                id="outlined-with-placeholder"
                label="Зарплата"
                variant="outlined"
                onChange={this.updateSalaryInput}
                className="dialog-field-input"
              />
            </div>
            <div className="dialog-field">
              <TextField
                id="outlined-with-placeholder"
                label="Опис вакансії"
                multiline={true}
                variant="outlined"
                onChange={this.updateTextarea}
                className="dialog-field-input"
                rows="8"
              />
            </div>
            <div>
              <FormControl>
                <Select
                  value={this.state.employment}
                  onChange={this.changeEmployment}
                  className="employment-select"
                > 
                  <MenuItem value="Повна зайнятість">Повна зайнятість</MenuItem>
                  <MenuItem value="Часткова зайнятість">Часткова зайнятість</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Typography 
              style={this.displayMessage()} 
              className="form-message" 
              variant="body2"
            >
              Заповніть усі поля
            </Typography>
            <div className="dialog-btns">
              <Button onClick={this.closeDialog} variant="contained" color="secondary">Вийти</Button>
              <Button type="submit" variant="contained" color="primary">Додати</Button>
            </div>
          </form>
        </Dialog>
      );
    }
  }

  handleClick = () => {
    this.setState({ ...this.state, isDialogOpened: true});
  };

  render() {
    if(this.props.users.user !== null) {
    return (
      <div className="add-news">
       
        <Button variant="contained" onClick={this.openDialog}>
          Додати вакансію
        </Button>
        
        
        {this.displayForm()}
        <CustomizedSnackbars 
          isSuccess={this.state.isSuccess} 
          closeMessage={this.closeMessage.bind(this)}
          alertMessage="Вакансія додана"
        />
      </div>
    );
    }else {
      return (
        <div className="add-news"></div>
      )
    }
  }
}

AddVacancy.propTypes = {
  users: propTypes.object.isRequired,
  addNewsAction: propTypes.func.isRequired,
  id: propTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps )(AddVacancy);
