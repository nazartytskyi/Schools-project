const express = require('express');
const Schools = require('../data/schools');
const admin = require('../firebase-admin/firebase-admin');

const router = express.Router();

const checkIfAuthenticated = (req, res, next) => {
  console.log(req.headers.authorization);
  admin.auth().verifyIdToken(req.headers.authorization)
    .then(user => {
      req.authId = user.uid;
      console.log(req.authId, 'verifyIdToken');
      next();
    })
    .catch(() => {
      console.log('verifyIdToken error (not authenticated)');
      res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    });
};

const checkIfAdmin = (req, res, next) => {
  console.log(req.headers.authorization);
  admin.auth().verifyIdToken(req.headers.authorization)
    .then(user => {
      if(user.admin){
        console.log(user, 'verifyIdToken if admin');
        next();
      } else {
        console.log(user, 'verifyIdToken error (not admin)');
        res
          .status(401)
          .send({ error: 'You are not admin' });
      }
    })
    .catch(() => {
      console.log('verifyIdToken error');
      res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    });
};

router.use('/protectedarticle', checkIfAuthenticated);
router.use('/protectedarticle', checkIfAdmin);
router.get('/protectedarticle', (req, res) => {
  console.log(req.authId, 'access to protected article');
  res.send('success');
});

router.post('/setrole/:uid', (req, res) => {
  const { update } = req.body;
  console.log(req.params.uid, update, 'setrole');
  admin.auth().setCustomUserClaims(req.params.uid, update).then(() => {
    console.log('setCustomUserClaims success');
  });
  return res.send({ message: 'Success' });
});


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
