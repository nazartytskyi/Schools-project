const admin = require('firebase-admin');

const serviceAccount = require('./schools-40858-firebase-adminsdk-wdzux-eec7d83c02.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://schools-40858.firebaseio.com'
});

module.exports = admin;