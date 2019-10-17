import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import { Container } from '@material-ui/core';
import './SchoolTeachers.scss';
const SchoolTeachers = ({teacher, indexTeacher}) => (
  <Card className="school-teacher-card" key={indexTeacher}>
    <Avatar src={teacher.photo} className='teacher-avatar'></Avatar>
    <Typography component='div'>
      <p>{teacher.name}</p>
      <p>Вік: {teacher.age}</p>
      <p>Предмет: {teacher.subject}</p>
    </Typography>
    <CardContent className="teacher-card-content">
      <Typography variant="body1" color="textPrimary"></Typography> 
    </CardContent>
  </Card>
)
export default SchoolTeachers;