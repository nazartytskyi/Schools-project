const mongoose = require('mongoose');
const admin = require('../firebase-admin/firebase-admin');
const Schools = require('../data/schools');
const Users = require('../data/users');

module.exports.checkIfAuthenticated = (req, res, next) => {
  admin
    .auth()
    .verifyIdToken(req.headers.authorization)
    .then(user => {
      req.authId = user.uid;
      next();
    })
    .catch(() => {
      res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    });
};

module.exports.checkIfAdmin = (req, res, next) => {
  admin
    .auth()
    .verifyIdToken(req.headers.authorization)
    .then(user => {
      if (user.admin) {
        next();
      } else {
        res.status(401).send({ error: 'You are not admin' });
      }
    })
    .catch(() => {
      res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    });
};

module.exports.setUserRole = (req, res) => {
  const { update } = req.body;
  admin.auth().setCustomUserClaims(req.params.uid, update);
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

module.exports.getUser = (req, res, next) => {
  Users.findOne({ _id: req.authId }, function(err, user) {
    if (user) {
      res.status(200).send(user);
    } else {
      next();
    }
  });
};

module.exports.createUser = (req, res) => {
  let user = new Users({ _id: req.authId, choosedSchools: [] });
  user.save();
  res.status(201).send(user);
};

module.exports.addFavoriteSchool = (req, res) => {
  const { schoolId } = req.body;
  Users.findOne({ _id: req.authId }, function(err, user) {
    if (user) {
      if (user.choosedSchools.indexOf(schoolId) === -1) {
        user.choosedSchools.push(schoolId);
        user.save();
        res.status(201).send('School added');
      } else {
        res.status(200).send('School already exist');
      }
    } else {
      res.status(500).send('User not found in collection users');
    }
  });
};

module.exports.deleteFavoriteSchool = (req, res) => {
  const { schoolId } = req.body;
  Users.findOne({ _id: req.authId }, function(err, user) {
    if (user) {
      let schoolIndex = user.choosedSchools.indexOf(schoolId);
      if (schoolIndex === -1) {
        res.status(500).send('School not found');
      } else {
        user.choosedSchools.splice(schoolIndex, 1);
        user.save();
        res.status(200).send('School removed from favorites');
      }
    } else {
      res.status(500).send('User not found in collection users');
    }
  });
};

module.exports.addNews = (req, res) => {
  const { news } = req.body;
  Schools.findOne({ _id: req.params.schoolId }, function(err, school) {
    if (school) {
      news._id = new mongoose.Types.ObjectId();
      school.news.unshift(news);
      school.save();
      res.status(201).send(news);
    } else {
      res.status(500).send('school not found in collection');
    }
  });
};

module.exports.removeNews = (req, res) => {
  const { idNews } = req.body;
  Schools.findOne({ _id: req.params.schoolId }, function(err, school) {
    if (school) {
      let indexNewsToDelete = school.news.findIndex(news => {
        return news._id === idNews;
      });
      school.news.splice(indexNewsToDelete, 1);
      school.save();
      res.status(200).send('News removed');
    } else {
      res.status(500).send('School not found in collection users');
    }
  });
};
