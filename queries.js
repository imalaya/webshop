
var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:admin@localhost:5432/webshop';
var db = pgp(connectionString);

// add query functions

module.exports = {
    getAllArticles: getAllArticles
};


function getAllArticles(req, res, next) {
    db.any('select * from articles')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL puppies'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
