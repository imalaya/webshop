var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

exports.sendMail = function(req, res) {

  var data = req.body;

  transporter.sendMail({
    from:'gutemineshop@gmail.com',
    to:'data.newMember.email',
    subject:'Dein Invite Code, ' + data.newMember.firstname,
    text: 'Test'
  });

  res.json(data);
}
