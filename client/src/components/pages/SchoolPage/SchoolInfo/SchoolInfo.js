import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import TitleIcon from '@material-ui/icons/Title';
import LabelIcon from '@material-ui/icons/Label';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import LanguageIcon from '@material-ui/icons/Language';
import PhoneIcon from '@material-ui/icons/Phone';
import InfoIcon from '@material-ui/icons/Info';
import FeedbackIcon from '@material-ui/icons/Feedback';
import MessageIcon from '@material-ui/icons/Message';
import PersonIcon from '@material-ui/icons/Person';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import './SchoolInfo.scss';
import AddNews from '../../../shared/AddNews/AddNews';

import { useState } from 'react';

// const [id, setCount] = useState(null);


const SchoolInfo = ({currentSchool, addSchool}) => (
 
      <React.Fragment>
        <CssBaseline />
            <Container maxWidth="lg">
              <div className="school-btn-container"> 
                <Typography className="school-name" variant="h4" color="textPrimary">
                  {currentSchool.name}
                </Typography>
                <ButtonGroup variant="contained" className='school-btns'>
                  <Button 
                    color="primary" 
                    className='btn-chosen' 
                    onClick= {() => {addSchool(currentSchool)}}
                    >
                    Add to chosen
                  </Button>
                  <Button color="secondary" className='btn-send-doc'>
                    Send documents
                  </Button>
                  
                </ButtonGroup>
                <AddNews id={currentSchool._id} currentSchool={currentSchool}/>
              </div>
              <div className='school-content'>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <CardMedia
                      className='media-school-photo'
                      image={currentSchool.photo}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Paper className="paper-info">
                      <Typography className="info h5" variant="h5">
                        <ImportContactsIcon fontSize='large'/>
                      </Typography>
                      <Typography component='div'>
                        <p><TitleIcon color='action' /> {currentSchool.name}</p>
                        <p><DescriptionIcon color='action'/> {currentSchool.description}</p>
                        <p><PhoneIcon color='action'/> {currentSchool.phoneNumber}</p>
                        <p><b>Адреса:</b></p> 
                        <p><LocationCityIcon color='action'/> {currentSchool.adress.city} </p>  
                        <p><LocationOnIcon color='action'/>  {currentSchool.adress.district} район</p>
                        <p><LocationOnIcon color='action'/> вулиця  {currentSchool.adress.street}</p>
                        <p><HomeIcon color='action'/>  №{currentSchool.adress.building }</p>     
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className="paper-info-bottom">
                      <Typography className="info h5" variant="h5">
                        <InfoIcon fontSize='large'/>
                      </Typography>
                      <Typography component='div'>
                        <p><PeopleIcon/>  Кількість першокласників: {currentSchool.firstGrade.enrolled}</p>
                        <p><PeopleOutlineIcon/>  Кількість вільних місць: {currentSchool.firstGrade.free}</p>
                        <p><LanguageIcon color='primary'/>  Мова викладання: {currentSchool.language}</p>
                        <p><LanguageIcon color='secondary'/>  Іноземні мови: {currentSchool.foreignLanguages + ' '}</p>
                        <p><TrendingUpIcon/>  Середній бал ЗНО:  {currentSchool.avgZno}</p>
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </div>  
            </Container>
            </React.Fragment>
)
export default SchoolInfo;