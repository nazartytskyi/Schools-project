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
import Login from '../../Vacancies/Login/Login';
import './SchoolVacancies.scss';
import RemoveVacancy from '../../../shared/RemoveVacancy/RemoveVacancy';

const SchoolVacancies = ({Index,vacancy,index,expanded,handleExpandClick,currentSchool, vacancyId}) => (
<Card className="school-vacancy-card" key={index}>
  <div className="card-header-vacancy">
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
    <Typography variant="body1" color="textPrimary">{currentSchool.name}</Typography>
    <Typography variant="body2" color="textSecondary">
      вул: 
      {' '}{currentSchool.adress.street} 
      {' '}{currentSchool.adress.building}, 
      {' '}{currentSchool.adress.district} район, м.
      {' '}{currentSchool.adress.city}.
    </Typography>
    <Typography variant="body1" color="textPrimary">тел: {currentSchool.phoneNumber}</Typography>
    <div className="respond">
      <Login email={currentSchool.email}/>
    </div> 
    <RemoveVacancy currentSchool={currentSchool} vacancyId={vacancyId}/>
              
  </CardContent>
  <CardActions disableSpacing className="card-footer">
    <IconButton
      className={expanded.has(Index)
        ? 'expandOpen' : 'expand' }
      onClick={() => handleExpandClick(Index)}
      aria-expanded = {expanded}
      aria-label = "show more"
    >
      <ExpandMoreIcon />
    </IconButton>
  </CardActions>
  <Collapse in={ expanded.has(Index) ? 
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