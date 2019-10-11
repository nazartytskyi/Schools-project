import React from 'react';
import './MainPage.scss'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import ButtonBases from './ButtonBases/ButtonBases'
import Container from '@material-ui/core/Container';
import Carousel from './../../shared/Carousel/Carousel'

export default class MainPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container maxWidth="lg">
        <main className="main-page">
          <ButtonBases></ButtonBases>
          <Carousel/>
        </main>
      </Container>
    );
  }
}