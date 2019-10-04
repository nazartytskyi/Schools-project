const admin = require('../firebase-admin/firebase-admin');
const Schools = require('../data/schools');

module.exports.checkIfAuthenticated = (req, res, next) => {
  console.log(req.headers.authorization);
  admin
    .auth()
    .verifyIdToken(req.headers.authorization)
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

module.exports.checkIfAdmin = (req, res, next) => {
  console.log(req.headers.authorization);
  admin
    .auth()
    .verifyIdToken(req.headers.authorization)
    .then(user => {
      if (user.admin) {
        console.log(user, 'verifyIdToken if admin');
        next();
      } else {
        console.log(user, 'verifyIdToken error (not admin)');
        res.status(401).send({ error: 'You are not admin' });
      }
    })
    .catch(() => {
      console.log('verifyIdToken error');
      res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    });
};

module.exports.setUserRole = (req, res) => {
  const { update } = req.body;
  console.log(req.params.uid, update, 'setrole');
  admin
    .auth()
    .setCustomUserClaims(req.params.uid, update)
    .then(() => {
      console.log('setCustomUserClaims success');
    });
  return res.send({ message: 'Success' });
};

module.exports.getSchools = (req, res) => {
  Schools.find((err, data) => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, data: data });
  });
};

module.exports.updateSchool = (req, res) => {
  const id = req.params.id;
  const { update } = req.body;
  Schools.findByIdAndUpdate(id, update, err => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true });
  });
};
