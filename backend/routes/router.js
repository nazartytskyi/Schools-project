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
  addNews,
  addRequest,
  updateRequest,
  getAllUsers,
  removeNews,
  addVacancy,
  removeVacancy
} = require('../middlewares/middlewares');

const router = express.Router();

// router.use('/protectedarticle', checkIfAuthenticated);
// router.use('/protectedarticle', checkIfAdmin);
// router.get('/protectedarticle', (req, res) => {
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
router.get('/allUsers', checkIfAdmin, getAllUsers);

router.post('/favoriteSchool', checkIfAuthenticated, addFavoriteSchool);
router.delete('/favoriteSchool', checkIfAuthenticated, deleteFavoriteSchool);

router.post('/schools/:schoolId/addNews', checkIfAuthenticated, addNews);
router.delete(
  '/schools/:schoolId/news/:idNews',
  checkIfAuthenticated,
  removeNews
);

router.post('/schools/:schoolId/request', checkIfAuthenticated, addRequest);
router.put('/schools/:schoolId/request', checkIfAuthenticated, updateRequest);

router.post('/schools/:schoolId/vacancy', checkIfAuthenticated, addVacancy);
router.delete(
  '/schools/:schoolId/vacancy/:idVacancy',
  checkIfAuthenticated,
  removeVacancy
);

module.exports = router;
