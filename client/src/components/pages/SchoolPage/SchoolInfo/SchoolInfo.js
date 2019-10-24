import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import DescriptionIcon from '@material-ui/icons/Description';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import TitleIcon from '@material-ui/icons/Title';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import LanguageIcon from '@material-ui/icons/Language';
import PhoneIcon from '@material-ui/icons/Phone';
import InfoIcon from '@material-ui/icons/Info';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import './SchoolInfo.scss';
import '../../../Variables.scss';
import AddNews from '../../../shared/AddNews/AddNews'
import DialogForm from './../DialogForm/DialogForm';
import InfoTable from './InfoTable';
import AddVacancy from '../../../shared/AddVacancy/AddVacancy';
import CustomizedSnackbars from './../../../pages/SchoolPage/SchoolInfo/Snackbar';

const SchoolInfo = ({currentSchool, changeHeart, checkFavorite, chosen, user}) => {
  const [isDialogOpen, openDialogForm] = React.useState(false);
  const [isNotificationOpen, openNotification] = React.useState(false);
  
  const closeMessage = () => {
    openNotification(false);
   }
  return (
      <React.Fragment>
        <CssBaseline />
          <Container maxWidth="lg">
           <CustomizedSnackbars 
             isSuccess={isNotificationOpen} 
             closeMessage={closeMessage.bind(this)}
             alertMessage="Ви не авторизовані!"
            />
            <DialogForm schoolId={currentSchool._id} close={() => openDialogForm(false)} open={isDialogOpen} />
            <div className="school-btn-container"> 
              <Typography className="school-name" variant="h4" color="textPrimary">
                {currentSchool.name}
              </Typography>
              <ButtonGroup variant="contained" className='school-btns'>
                <Button 
                  color="primary" 
                  className='btn-chosen' 
                  onClick= {() => checkFavorite(currentSchool,chosen)}
                  >
                    Додати в обрані
                    {changeHeart(chosen)}
                </Button>
                <Button onClick={() => user ? openDialogForm(true) : openNotification(true)} color="secondary" className='btn-send-doc'>
                  Надіслати заявку
                </Button>
              </ButtonGroup>
              <AddNews id={currentSchool._id}/>
              <AddVacancy currentSchool={currentSchool}/>
            </div>
            <div className='school-content'>
              <Grid container spacing={3}>
                <Grid item lg={6} xs={6} sm={12}>
                  <CardMedia
                    className='media-school-photo'
                    image={currentSchool.photo}
                  />
                </Grid>
                <Grid item lg={6} xs={6} sm={12}>
                  <Paper className="paper-info">
                    <Typography className="info h5" variant="h5">
                      <ImportContactsIcon fontSize='large'/>
                    </Typography>
                    <Typography className='school-contact-info' component='div'>
                      <Typography className='school-adress' component='div'>
                        <p><TitleIcon color='action' fontSize='small' /> {currentSchool.name}</p>
                        <p><DescriptionIcon color='action' fontSize='small'/> {currentSchool.description}</p>
                        <p><PhoneIcon color='action' fontSize='small'/> {currentSchool.phoneNumber}</p>
                      </Typography>
                      <Typography className='school-adress' component='div'>
                        <p><LocationCityIcon color='action' fontSize='small'/> {currentSchool.adress.city} </p>  
                        <p><LocationOnIcon color='action' fontSize='small'/>  {currentSchool.adress.district} район</p>
                        <p><LocationOnIcon color='action' fontSize='small'/> вулиця  {currentSchool.adress.street}, {currentSchool.adress.building } </p>
                      </Typography>   
                    </Typography>
                    <Typography className='school-about' component='div'>
                      <p><PeopleIcon/>  Кількість першокласників: {currentSchool.firstGrade.enrolled}</p>
                      <p><PeopleOutlineIcon/>  Кількість вільних місць: {currentSchool.firstGrade.total - currentSchool.firstGrade.enrolled}</p>
                      <p><LanguageIcon color='primary'/>  Мова викладання: {currentSchool.language}</p>
                      <p><LanguageIcon color='secondary'/>  Іноземні мови: {currentSchool.foreignLanguages + ' '}</p>
                      <p><TrendingUpIcon/>  Середній бал ЗНО:  {currentSchool.avgZno}</p>
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <div className="paper-info-bottom">
                    <Typography className="info h5" variant="h5">
                      <InfoIcon fontSize='large'/>
                    </Typography>
                    <div className='info-with-table'>
                        <InfoTable
                          currentSchool={currentSchool}
                        />
                    </div>
                  </div >
                </Grid>
              </Grid>
            </div>  
          </Container>
      </React.Fragment>
  )
}
export default SchoolInfo;