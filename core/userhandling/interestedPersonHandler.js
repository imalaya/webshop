/**
 * Created by Ju on 18.11.2016.
 */

var interestedPerson = require('../db/interestedPerson');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

exports.createInterestedPerson = function(emailAddress) {
    var username = generateUsername(emailAddress);
    var firstName = generateFirstName(username);
    var lastName = generateLastName(username);
    console.log(username);
    console.log(firstName);
    console.log(lastName);
    var interestedPersonId = saveInterestedPerson(firstName, lastName, username, emailAddress);
    sendEmail(interestedPersonId, username, emailAddress);
};
function generateUsername(emailAddress){
    var emailAddressArray = emailAddress.split('@');
    return emailAddressArray[0];
}
function generateFirstName(username){
    var usernameArray = username.split('.');
    return usernameArray[0];
}
function generateLastName(username){
    var usernameArray = username.split('.');
    return usernameArray[1];
}

function saveInterestedPerson(firstName, lastName, username, emailAddress){
interestedPerson.saveInterestedPerson(firstName, lastName, username, emailAddress);
}

// function sendEmail(interestedPersonId, username, emailAddress){
//     //TODO
// }

// exports.sendEmail = function(req, res) {
//   var data = req.body;
//
//   transporter.sendEmail({
//     from: 'gutemineshop@gmail.com',
//     // to: data.newMember.email,
//     to: 'jlwenzel@outlook.com',
//     subject: 'Dein Invite Code, ',
//     text: 'Test'
//   });
//
//   res.json(data);
//
// };
