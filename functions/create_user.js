const admin = require('firebase-admin');

module.exports = function(req, res) {
  // Verify the user provided a phone number
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Bad Input' });   
    // 422 gives a message that something wrong happened
  }

  // Format the phone number to remove dashes and parens
  const phone = String(req.body.phone).replace(/[^\d.]/g);

  // Create a new user account using that number
  admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));
    // uid = property used to identify unique user, this statement returns a promise, therefore the use of .then statement

  // Respond to the user account, saying the account was made


}
