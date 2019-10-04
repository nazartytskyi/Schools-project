const express = require('express');
const {
  checkIfAuthenticated,
  checkIfAdmin,
  setUserRole,
  getSchools,
  updateSchool
} = require('../middlewares/middlewares');

const router = express.Router();

router.use('/protectedarticle', checkIfAuthenticated);
router.use('/protectedarticle', checkIfAdmin);
router.get('/protectedarticle', (req, res) => {
  console.log(req.authId, 'access to protected article');
  res.send('success');
});

router.post('/setrole/:uid', setUserRole);

// this is our get method
// this method fetches all available data in our database
router.get('/getSchools', getSchools);

// this is our update method
// this method overwrites existing data in our database
router.post('/update/schools/:id', updateSchool);

module.exports = router;
