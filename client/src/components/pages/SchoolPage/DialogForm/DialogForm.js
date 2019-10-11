import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

export default class DialogForm extends React.Component {

  render() {
    return (
      <Dialog onClose={this.props.close} open={this.props.open || false}>
        <form noValidate autoComplete="off">
          <TextField
            id="standard-name"
            label="Name"
            margin="normal"
          />
              <TextField
            id="standard-name"
            label="Name"
            margin="normal"
          />
              <TextField
            id="standard-name"
            label="Name"
            margin="normal"
          />
              <TextField
            id="standard-name"
            label="Name"
            margin="normal"
          />
              <TextField
            id="standard-name"
            label="Name"
            margin="normal"
          />
              <TextField
            id="standard-name"
            label="Name"
            margin="normal"
          />
        </form>
      </Dialog>
    )
  }
}