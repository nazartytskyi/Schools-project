import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './DialogForm.scss';

export default class DialogForm extends React.Component {

  render() {
    return (
      <Dialog onClose={this.props.close} open={this.props.open || false}>
        <form className="dialog-form" noValidate autoComplete="off">
          <div className="general-info">
           <TextField
              id="name"
              label="Ім'я"
              margin="normal"
            />
            <TextField
              id="surname"
              label="Прізвище"
              margin="normal"
            />
          </div>
            <TextField
              id="email"
              label="Email"
              margin="normal"
            />

          <input className="file-input" type="file"/>

          <Button
            className="submit-btn"
            variant="contained"
            color="primary"
            endIcon={<Icon>Надіслати</Icon>}
            type="submit"
          > 
            Send
          </Button>
  
        </form>
      </Dialog>
    )
  }
}