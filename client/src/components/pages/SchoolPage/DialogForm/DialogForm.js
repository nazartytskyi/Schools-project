import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './DialogForm.scss';
import { addRequest } from './../../../../actions/addRequest'

export default class DialogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: {}, isDialogOpen: true};
  }

  onFieldChanged(fieldName, value) {
    this.setState( 
      {
        form: {
          ...this.state.form,
          [fieldName]: value
        } 
    });
  }

  isFormValid(form) {
    if ( form.studentName
      && form.dateBirth
      && form.fatherName
      && form.motherName
      && form.adress
      && form.adress.city
      && form.adress.district
      && form.adress.street
      && form.adress.building
      && form.email
    ) {
      return true
    }

    return false;
  }

  sendRequest(form) {
    form.dateApply = Date.now();
    addRequest(form, this.props.schoolId);
    this.setState({form: {}});
    this.props.close();
  }

  render() {
    return (
      <Dialog onClose={this.props.close} open={this.state.isDialogOpen && this.props.open || false}>
        <form className="dialog-form" noValidate autoComplete="off">
          <TextField
            required={true}
            id="name"
            label="Ім'я дитини"
            placeholder="Петренко Петро Петрович"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onChange={(e) => this.onFieldChanged('studentName', e.target.value)}
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
            onChange={(e) => this.onFieldChanged('dateBirth', e.target.value)}
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
            onChange={(e) => this.onFieldChanged('fatherName', e.target.value)}
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
            onChange={(e) => this.onFieldChanged('motherName', e.target.value)}
          />

          <TextField
            required={true}
            id="city"
            label="Місто проживання"
            placeholder="Львів"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onChange={(e) => this.onFieldChanged('adress',{ ...this.state.form.adress, city: e.target.value })}
          />
          
          <TextField
            required={true}
            id="district"
            label="Район"
            placeholder="Залізничний"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onChange={(e) => this.onFieldChanged('adress', { ...this.state.form.adress, district: e.target.value })}
          />

          <TextField
            required={true}
            id="street"
            label="Вулиця"
            placeholder="Городоцька"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onChange={(e) => this.onFieldChanged('adress', { ...this.state.form.adress, street: e.target.value })}
          />

          <TextField
            required={true}
            id="building"
            label="Номер будинку"
            placeholder="174"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onChange={(e) => this.onFieldChanged('adress', { ...this.state.form.adress, building: e.target.value })}
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
            onChange={(e) => this.onFieldChanged('email', e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                onChange={(e) => this.onFieldChanged('firstPriority', e.target.checked)}
              />
            }
            label="Перший пріоритет"
          />      

          <Button
            className="submit-btn"
            variant="contained"
            color="primary"
            endIcon={<Icon>Надіслати</Icon>}
            onClick={() => this.sendRequest(this.state.form)}
            disabled={!this.isFormValid(this.state.form)}
          > 
            Надіслати
          </Button>
  
        </form>
      </Dialog>
    )
  }
}