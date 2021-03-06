import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './DialogForm.scss';
import { addRequest } from './../../../../actions/addRequest';
import { fromBase64 } from 'bytebuffer';
import CustomizedSnackbars from './../../../shared/AddNews/SuccessAlert';

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  addRequest: (request, schoolId) => {
    return dispatch(addRequest(request, schoolId));
  }
});
class DialogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: {}, isDialogOpen: true, isSuccess: false };
  }

  onFieldChanged(fieldName, value) {
    this.setState({
      form: {
        ...this.state.form,
        [fieldName]: value
      }
    });
  }

  isFormValid(form) {
    if (
      form.studentName &&
      form.dateBirth &&
      form.fatherName &&
      form.motherName &&
      form.adress &&
      form.adress.city &&
      form.adress.district &&
      form.adress.street &&
      form.adress.building &&
      form.email
    ) {
      return true;
    }

    return false;
  }

  closeMessage = () => {
    this.setState({...this.state, isSuccess: false});
  }

  sendRequest(form) {
    form.dateApply = new Date().toLocaleDateString();
    form.dateBirth = new Date(form.dateBirth).toLocaleDateString();
    fromBase64.firstPriority = false;
    form.comment = '';
    form.status = 'подано';
    this.props.addRequest(form, this.props.schoolId);
    this.setState({ form: {} });
    this.props.close();
    this.setState({ isSuccess: true });
  }

  render() {
    return (
      <>
      <CustomizedSnackbars 
        variant="succes"
        isSuccess={this.state.isSuccess} 
        closeMessage={this.closeMessage.bind(this)}
        alertMessage="Надіслано"
      />
      <Dialog
        onClose={this.props.close}
        open={(this.state.isDialogOpen && this.props.open) || false}
      >
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
            onChange={e => this.onFieldChanged('studentName', e.target.value)}
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
            onChange={e => this.onFieldChanged('dateBirth', e.target.value)}
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
            onChange={e => this.onFieldChanged('fatherName', e.target.value)}
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
            onChange={e => this.onFieldChanged('motherName', e.target.value)}
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
            onChange={e =>
              this.onFieldChanged('adress', {
                ...this.state.form.adress,
                city: e.target.value
              })
            }
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
            onChange={e =>
              this.onFieldChanged('adress', {
                ...this.state.form.adress,
                district: e.target.value
              })
            }
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
            onChange={e =>
              this.onFieldChanged('adress', {
                ...this.state.form.adress,
                street: e.target.value
              })
            }
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
            onChange={e =>
              this.onFieldChanged('adress', {
                ...this.state.form.adress,
                building: e.target.value
              })
            }
          />

          <TextField
            required={true}
            id="email"
            label="Email"
            placeholder="your.mail@domain.com"
            margin="normal"
            type="email"
            InputLabelProps={{
              shrink: true
            }}
            onChange={e => this.onFieldChanged('email', e.target.value)}
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
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogForm);