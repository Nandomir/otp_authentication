const admin = require('firebase-admin'); //allows accessing the data in Firebase
const functions = require('firebase-functions');
const createUser = require('./create_user');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-f40d4.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);
