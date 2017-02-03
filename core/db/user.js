/**
 * Created by Ju on 01.02.2017.
 */
/**
 * Created by Ju on 13.12.2016.
 */

var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:admin@localhost:5432/webshop';
var db = pgp(connectionString);

module.exports = {
    isLoggedIn: isLoggedIn
};


function isLoggedIn(req, res, next) {
    db.one('select id from user where username=$1, pwd=$2',[req.body.username, req.body.password])
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE article'
                });
        })
        .catch(function (err) {
            console.log("Kein user!");
            return next(err);
        });
}
