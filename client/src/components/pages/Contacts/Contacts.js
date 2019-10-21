import React, { Component } from 'react';
import './Contacts.scss';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import TelegramIcon from '@material-ui/icons/Telegram';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Button from '@material-ui/core/Button';

export class Contacts extends Component {
  render() {
    return (
      <React.Fragment>
        <Container maxWidth="sm" className="container contacts-container">
          <Card>
            <CardContent>
              <div className="contacts-phones">
                <Typography color="textSecondary">
                  Щоб звязатися з нами телефонуйте за номером:
                </Typography>
                <div className="contacts-phone">
                  <PhoneIcon color="action" className="contacts-phone-icon"/>
                  <Typography><a href="tel:+380979990099">+38(097)999-00-99</a></Typography>
                </div>
                <div className="contacts-phone">
                  <PhoneIcon color="action" className="contacts-phone-icon"/>
                  <Typography><a href="tel:+380670009900">+38(067)000-99-00</a></Typography>
                </div>
              </div>
              <div className="contacts-mail">
                <Typography color="textSecondary">Або відправляйте email</Typography>
                <Button 
                  variant="contained"
                  href="mailto:schools@gmail.com"
                  className="contacts-mail-btn"
                >
                  Написати email
                </Button>
              </div>
              <div className="contacts-social"> 
                <div className="contacts-social-links">
                  <a href="http://web.telegram.org">
                    <div className="contacts-social-link">
                      <Typography color="textSecondary" className="contacts-social-link-text">
                        Наша група в Telegram
                      </Typography>
                      <TelegramIcon className="contacts-social-link-icon" color="action"/>
                    </div>
                  </a>
                  <a href="https://www.facebook.com">
                    <div className="contacts-social-link">
                      <Typography color="textSecondary">Наша група в Facebook</Typography>
                      <FacebookIcon className="contacts-social-link-icon" color="action"/>
                    </div>
                  </a>
                  <a href="https://www.instagram.com">
                    <div className="contacts-social-link">
                      <Typography color="textSecondary">Наша група в Instagram</Typography>
                      <InstagramIcon className="contacts-social-link-icon" color="action"/>
                    </div>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </React.Fragment>  
    )
  }
}

export default Contacts
