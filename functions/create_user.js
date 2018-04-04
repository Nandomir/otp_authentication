module.exports = function(req, res) {
  res.send(req.body);   // body is a JS object containing all the data passed to this function when user called it
}