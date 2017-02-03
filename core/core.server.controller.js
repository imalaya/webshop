var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

exports.sendMail = function(req, res) {
  var data = req.body;

  transporter.sendMail({
    from: data.contactEmail,
    to: 'gutemineshop@gmail.com',
    subject: 'Message from ' + data.contactName,
    text: data.contactMsg
  });

  res.json(data);

};

// exports.sendEmail = function(req, res) {
//   var data = req.body;
//
//   transporter.sendEmail({
//     from: 'gutemineshop@gmail.com',
//     to: 'jlwenzel@outlook.com',
//     subject: 'Dein Invite Code',
//     text: 'Test'
//   });
//
//   res.json(data);
//
// };
