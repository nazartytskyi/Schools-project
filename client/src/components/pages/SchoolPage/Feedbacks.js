import React, { Component } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import {Typography, Container, IconButton } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import './Feedbacks.scss';

const Feedbacks = ({handleExpandClick,expanded,fIndex,feedback}) => {
  return (
    <Container maxWidth='lg'>
      <Typography className='school-fItems'>
        <p><PersonIcon fontSize='medium'/>{feedback.author}:</p>
        <p>{feedback.text}</p>
      </Typography>
      <Divider/>
      <IconButton
        className={expanded.has(fIndex)
          ? 'expandOpen' : 'expand' }
        onClick={()=>{handleExpandClick(fIndex)}}
        aria-expanded={expanded}
        aria-label="show more"
      ></IconButton>
    </Container>
  )
}
export default Feedbacks;