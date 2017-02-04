var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

exports.sendEmail = function(req, res) {
  var data = req.body;

  transporter.sendEmail({
    from: 'gutemineshop@gmail.com',
    // to: data.newMember.email,
    to: 'jlwenzel@outlook.com',
    subject: 'Dein Invite Code, ',
    text: 'Test'
  });

  res.json(data);

};
