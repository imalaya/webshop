var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

exports.sendMail = function(req, res) {
  var data = req.body;

  transporter.sendMail({
    from: 'gutemineshop@gmail.com',
    // to: data.email,
    to: data.testMail,
    subject: 'Dein Invite Code, ' + data.firstName,
    text: 'Hallo ' + data.firstName + ', mit folgendem Link wirst Du auf eine Seite weitergeleitet, auf der Du dann Dein Passwort vergeben kannst. Viel Spaß' +
    '                     ' + 'gutemine.f4.htw-berlin.de:8000/#/register.html'
  });

  res.json(data);

};
