import React from 'react';
import { getAllUsers } from '../../../actions/getAllUsers';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './FavSchoolsPage.scss'

class FavSchoolsPage extends React.Component {
    
  render() {
    const currentUserFavSchoolsId = this.props.users.userFromMongo && [...this.props.users.userFromMongo.choosedSchools];
    const favSchools = [];
    let favSchoolsCards = [];

    if (currentUserFavSchoolsId) {
      for (let i in this.props.schools.data) {
        for (let j in currentUserFavSchoolsId) {
          if (this.props.schools.data[i]._id === currentUserFavSchoolsId[j]) {
            favSchools.push(this.props.schools.data[i]);
          }
        }
      }

      favSchoolsCards = favSchools.map(school => {
        return (
          <div className="card-wrapper" key={school.id}>
              <div className="photo-wrapper">
                <img src={school.photo}/>
              </div>

              <div className="school-info">
               <Link to={'/school/' + school.id}> <h3>{school.name}</h3> </Link>
               <p>Номре телефону: {school.phoneNumber}</p>
               <p>{school.adress && school.adress.city + ' ' +  school.adress.street + ' ' + school.adress.building}</p>
               <p>{school.description}</p>
               <Link to={'/school/' + school.id}>

                 <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  > 
                    Перейти на сторінку школи
                  </Button>
                </Link>
              </div>
                     
          </div>
        );
      });
    }

    

    return (
      <Container maxWidth="lg">
        {favSchoolsCards || ''}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  getAllUsers: () => {
    return dispatch(getAllUsers());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavSchoolsPage);