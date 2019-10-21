import React, { Component } from 'react';
import MessageIcon from '@material-ui/icons/Message';
import PersonIcon from '@material-ui/icons/Person';
import {Typography, Container, IconButton } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import './Feedbacks.scss';

const Feedbacks = ({handleExpandClick,expanded,fIndex,feedback}) => {
  return (
    <Container maxWidth='lg'>
      <Typography className='school-fItems'>
        <p><PersonIcon fontSize='large'/>{feedback.author}</p>
        <p><MessageIcon fontSize='large'/>{feedback.text}</p>
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