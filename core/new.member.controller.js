var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

exports.sendEmail = function(req, res) {
  var data = req.body;

  transporter.sendEmail({
    from: data.newMember.email,
    to: 'gutemineshop@gmail.com',
    subject: 'Dein Invite Code, ',
    text: 'Test'
  });

  res.json(data);

};
