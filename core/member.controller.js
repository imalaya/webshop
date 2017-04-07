var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

exports.sendMail = function(req, res) {
  var data = req.body;

  transporter.sendMail({
    from: 'gutemineshop@gmail.com',
    // to: data.email,
    to: data.testMail,
    subject: 'Dein Invite Code, ' + data.firstName,
    text: 'Test'
  });

  res.json(data);

};
