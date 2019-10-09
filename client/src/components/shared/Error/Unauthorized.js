import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import './Error.scss';

class Unauthorized extends Component {
  render() {
    return (
      <Container maxWidth="lg" className="error-container">
        <div className="error-text">
          <h2 className="error-text-header">Помилка!</h2>
          <p className="error-text-body">
            Ви не авторизовані для обраної дії. <br />
            Будь ласка, увійдіть та повторіть спробу.
          </p>
          <Link className='error-link' to='/'>Повернутися на головну сторінку</Link>
        </div>
      </Container>
    );
  }
}

export default Unauthorized;
