import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import './SchoolInfo.scss';

const mapStateToProps = state => ({
  schools: state.schools.data
});

class SchoolInfo extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const schools = this.props.schools || [];
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <div className="school-btn-container"> 
            <Typography className="school-name" variant="h4" color="textPrimary">
              {schools[0] ? schools[0].name : 'loading...'}
            </Typography>
            <ButtonGroup variant="contained" className='school-btns'>
              <Button color="primary" className='btn-chosen'>
                Add to chosen
              </Button>
              <Button color="secondary" className='btn-send-doc'>
                Send documents
              </Button>
            </ButtonGroup>
          </div>
          {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
          <div className='school-content'>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <CardMedia
                  className='media-school-photo'
                  image={schools[0] ? schools[0].news[0].img : 'loading...'}
                />
              </Grid>
              <Grid item xs={6}>
                <Paper className="paper-info">
                  <Typography className="info h5" variant="h5">
                    <b>Info:</b>
                  </Typography>
                  <Typography>
                    <p>Name:  {schools[0] ? schools[0].name : 'loading...'}</p>
                    <p>Description: {schools[0] ? schools[0].description : 'loading...'}</p>
                    <p><b>Address:</b></p> 
                    <p>City:  {schools[0] ? schools[0].adress.city : 'loading...'} </p>  
                    <p>District:  {schools[0] ? schools[0].adress.district : 'loading...'}</p>
                    <p>Street:  {schools[0] ? schools[0].adress.street : 'loading...'}</p>
                    <p>Building :  {schools[0] ? schools[0].adress.building : 'loading...'}</p>     
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className="paper-info-bottom">
                  <Typography className="info h5" variant="h5">
                    Detailed Information
                  </Typography>
                  <Typography>
                    <p>Name:  {schools[0] ? schools[0].news[0].description : 'loading...'}</p>
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Container>
      </React.Fragment> 
    )
  }
}

SchoolInfo.propTypes = {
  schools: PropTypes.object.isRequired
}
export default connect(mapStateToProps)(SchoolInfo);