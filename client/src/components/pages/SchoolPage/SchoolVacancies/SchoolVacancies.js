import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container } from '@material-ui/core';
import Login from '../../Vacancies/Login/Login';
import './SchoolVacancies.scss';
import RemoveVacancy from '../../../shared/RemoveVacancy/RemoveVacancy';

const SchoolVacancies = ({SchoolNewsId,vacancy,index,state,handleExpandClick, currentSchool, vacancyId}) => (
<Card className="school-vacancy-card" key={index}>
  <div className="card-header">
    <CardHeader
      title={vacancy.title}
      subheader={vacancy.date}
    >
    </CardHeader>
    <div className="salary">
      <div><Typography>{vacancy.salary} грн</Typography></div>
      <div><Typography variant="body2" color="textSecondary">{vacancy.employment}</Typography></div>
    </div>
  </div>
  <CardContent className="card-content">
    <Typography variant="body1" color="textPrimary">{vacancy.school}</Typography>
    <Typography variant="body2" color="textSecondary">
      {' '}{vacancy.adress} 
    </Typography>
    <Typography variant="body1" color="textPrimary">тел: {vacancy.phoneNumber}</Typography>
    <div className="respond">
    <Login/>
    
    </div> 
    <RemoveVacancy currentSchool={currentSchool} vacancyId={vacancyId}/>
              
  </CardContent>
  <CardActions disableSpacing className="card-footer">
    <IconButton
      className={ state.expanded.has(SchoolNewsId)
        ? 'expandOpen' : 'expand' }
      onClick={() => handleExpandClick(SchoolNewsId)}
      aria-expanded = {state.expanded}
      aria-label = "show more"
    >
      <ExpandMoreIcon />
    </IconButton>
  </CardActions>
  <Collapse in={ state.expanded.has(SchoolNewsId) ? 
    true : 
    false} timeout="auto" unmountOnExit
  >
    <CardContent>
      <Typography paragraph>{vacancy.description}</Typography>
    </CardContent>
  </Collapse>
</Card>
)
export default SchoolVacancies;