const express = require('express');
const Schools = require('../data/schools');

const router = express.Router();

// router.get('/getProtectedData', (req, res) => {
//   req.headers.authorization

// });

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Schools.find((err, data) => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData/schools/:id', (req, res) => {
  const id = req.params.id;
  const { update } = req.body;
  Schools.findByIdAndUpdate(id, update, err => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Schools.findByIdAndRemove(id, err => {
    if (err) {
      return res.send(err);
    }
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Schools();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS'
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true });
  });
});

module.exports = router;
