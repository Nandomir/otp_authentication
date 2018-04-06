const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function(req, res) {
  if(!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number' });
  }

  const phone = String(req.body.phone).replce(/[^\d.]/g, '');

  admin.auth().getUser(phone)  // asychronus request
    .then(userRecord => {
      const code = Math.floor((Math.random() * 8999 + 1000)); // floor guarantees we will get a rounded number

      twilio.messages.create({
        from: '+441315103691',
        to: phone,
        body: 'You recieved an SMS from Node.js using Twilio. Your code is ' + code
      }) // twilio api
    })
    .catch((err) => {
      res.status(422).send({ error: err}); // res.status(422).send({ error: 'User not found'}); ideal in a production world
    });
}
