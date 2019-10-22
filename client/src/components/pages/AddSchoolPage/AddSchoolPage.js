import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './AddSchoolPage.scss';
import { addSchool } from './../../../actions/addSchool';
import Container from '@material-ui/core/Container';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  addSchool: school => {
    return dispatch(addSchool(school));
  }
});

class AddSchoolPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: {} };
  }

  getFiles = (e) => {
    let oFReader = new FileReader();
    oFReader.readAsDataURL(e.target.files[0]);
    this.setState({...this.state, fileName: e.target.files[0].name});
    const self = this;
    
 
    oFReader.onload = function (oFREvent) {
      self.setState({
        form: {
          ...self.state.form,
          photo: oFREvent.target.result
        }
      });
    }   
  };

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
      form.name &&
      form.firstGrade &&
      form.firstGrade.free &&
      form.avgZno &&
      form.phoneNumber &&
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

  sendRequest(form) {
    form.firstGrade.requests = [];
    this.props.addSchool(form);
    this.setState({ form: {} });
  }

  render() {
    return (
      <Container maxWidth="md">
        <form className="add-school-form" noValidate autoComplete="off">
          <TextField
            required={true}
            id="name"
            label="Назва школи"
            placeholder="СЗШ №62"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onChange={e => this.onFieldChanged('name', e.target.value)}
          />
          <TextField
            required
            id="phoneNumber"
            label="Номер телефону"
            margin="normal"
            placeholder="+380123456789"
            InputLabelProps={{
              shrink: true
            }}
            onChange={e => this.onFieldChanged('phoneNumber', e.target.value)}
          />

          <TextField
            required
            id="free"
            label="Кількість вільних місць для вступу у перший клас"
            placeholder="14"
            margin="normal"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            onChange={e =>
              this.onFieldChanged('firstGrade', {
                ...this.state.form.firstGrade,
                free: e.target.value
              })
            }
          />

          <TextField
            required
            id="free"
            label="Середній бал ЗНО"
            placeholder="167"
            margin="normal"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            onChange={e => this.onFieldChanged('avgZno', e.target.value)}
          />

          <TextField
            required
            id="city"
            label="Місто"
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
            InputLabelProps={{
              shrink: true
            }}
            onChange={e => this.onFieldChanged('email', e.target.value)}
          />

          <div className="download-image">
              <Typography color="textSecondary" className="download-image-title">
                Завантажте світлину (розмір не більше 0.1 Mb)
              </Typography>
              <label className="download-image-btn">
              <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={this.getFiles}/>
              <Typography>Завантажити</Typography>
              </label>
              <Typography className="file-name">{this.state.fileName}</Typography> 
            </div>

          <Button
            className="submit-btn"
            variant="contained"
            color="primary"
            endIcon={<Icon>Додати</Icon>}
            onClick={() => this.sendRequest(this.state.form)}
            disabled={!this.isFormValid(this.state.form)}
          >
            Надіслати
          </Button>
        </form>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSchoolPage);
