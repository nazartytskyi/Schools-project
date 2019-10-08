import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import './Dialog.scss';
import { useState } from 'react';



function SimpleDialog(props) {

  const { onClose, selectedValue, open } = props;

  let file = null;
  

  const handleClose = () => {
    onClose(selectedValue);
  };

  const fileSelectedHandler = (e) => {
    file = e.target.files[0];

  }

  const fileUploadHandler = (e) => {
    console.log(file);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
     <div className="respond-form">
       <h2 className="respond-form-header">Відправити резюме</h2>
       <div className="respond-form-phone">
        <label>Hомер телефону</label>
        <input type="text"/>
       </div>
       <div className="respond-form-file">
       <input type="file" multiple onChange={fileSelectedHandler}/>
       </div>
       <button onClick={fileUploadHandler}>Відправити</button>
      
       
     </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default function DialogForm(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
  };

  return (
    <div>
      <Button
            variant="contained"
            className="respond-btn"
            aria-describedby={props.id}
            onClick={handleClickOpen}
          >
            Відправити резюме
          </Button>
          <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}