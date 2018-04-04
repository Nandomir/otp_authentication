const admin = require('firebase-admin'); //allows accessing the data in Firebase
const functions = require('firebase-functions');
const createUser = require('./create_user');
const serviceAccount = require('./service_account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), 
  databaseURL: "https://one-time-password-f40d4.firebaseio.com"
});
// service account is the private key generated from Firebase as a .json file

exports.createUser = functions.https.onRequest(createUser);
