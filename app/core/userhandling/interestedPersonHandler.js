/**
 * Created by Ju on 18.11.2016.
 */
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
var interestedPerson = require('./core/db/interestedPerson');
interestedPerson.saveInterestedPerson("firstName", "lastName", "userName", "emailAddress");