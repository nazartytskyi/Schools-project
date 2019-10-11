const express = require('express');
const {
  checkIfAuthenticated,
  checkIfAdmin,
  setUserRole,
  getSchools,
  updateSchool,
  getUser,
  createUser,
  addFavoriteSchool,
  deleteFavoriteSchool,
  addNews
} = require('../middlewares/middlewares');

const router = express.Router();

// router.use('/protectedarticle', checkIfAuthenticated);
// router.use('/protectedarticle', checkIfAdmin);
// router.get('/protectedarticle', (req, res) => {
//   console.log(req.authId, 'access to protected article');
//   res.send('success');
// });


router.post('/setrole/:uid', checkIfAdmin, setUserRole);

// this is our get method
// this method fetches all available data in our database
router.get('/getData', getSchools);

// this is our update method
// this method overwrites existing data in our database
router.post('/update/schools/:id', updateSchool);

router.get('/user', checkIfAuthenticated, getUser, createUser);

router.post('/favoriteSchool', checkIfAuthenticated, addFavoriteSchool);
router.delete('/favoriteSchool', checkIfAuthenticated, deleteFavoriteSchool);

router.post('/schools/:schoolId/addNews', checkIfAuthenticated, addNews);

module.exports = router;
