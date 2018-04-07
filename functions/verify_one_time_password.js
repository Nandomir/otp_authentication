const admin = require('firebase-admin');

module.exports = function(req,res) {
  if(!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'Phone and code must be provided'});
  }

  const phone = String(req.body.phone).replace(/[^\d.]/g, '');
  const code = parseInt(req.body.code);

  admin.auth().getUser(phone)
    .then(() => {
      const ref = admin.database().ref('users/' + phone);
      // creates a reference to code status user
      ref.on('value', snapshot => { 

        // after recieveing the value, no need to listen for any changes
        ref.off(); // stop listening
        const user = snapshot.val();

        if (user.code !== code || !user.codeValid) {
          return res.status(422).send({ error: 'Code not valid'});
        }

        // marking existing code as being valid
        ref.update({ codeValid: false });
        admin.auth().createCustomToken(phone) // generates a JSON web token for the user
          .then(token => res.send({ token: token })) 
          return null
      });
      return null;
    })
    .catch((err) => res.status(422).send({ error: err }))
}
