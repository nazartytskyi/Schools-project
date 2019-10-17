import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './DialogForm.scss';

export default class DialogForm extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    return (
      <Dialog onClose={this.props.close} open={this.props.open || false}>
        <form className="dialog-form" noValidate autoComplete="off">
          <TextField ref={this.myRef}
            required={true}
            id="name"
            label="Ім'я дитини"
            placeholder="Петренко Петро Петрович"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onClick={() => {console.log(this.myRef)}}
          />
          <TextField
            required
            id="surname"
            label="Дата народження дитини"
            margin="normal"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
          />

          <TextField
            required
            id="fatherName"
            label="Ім'я батька"
            placeholder="Петренко Петро Петрович"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />

          <TextField
            required
            id="motherName"
            label="Ім'я матері"
            placeholder="Петренко Галина Петрівна"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />

        <FormControlLabel
          control={
            <Checkbox
              color="primary"
            />
          }
          label="Перший пріоритет"
        />

          <TextField
            required={true}
            id="email"
            label="Email"
            placeholder="your.mail@domain.com"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />

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