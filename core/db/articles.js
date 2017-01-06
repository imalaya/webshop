/**
 * Created by Ju on 13.12.2016.
 */

var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

// var pg = require('pg');
//var connectionString = "postgres://postgres:admin@localhost:5432/webshop"; --> Syntax für Clientverbindung

/*var dbconfig = {
    user: 'postgres', //env var: PGUSER
    database: 'webshop', //env var: PGDATABASE
    password: 'admin', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 3000 // how long a client is allowed to remain idle before being closed
};
*/
//var pool = new pg.Pool(dbconfig);

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:admin@localhost:5432/webshop';
var db = pgp(connectionString);

module.exports = {
    getAllArticles: getAllArticles,
    getSingleArticle: getSingleArticle,
    createArticle: createArticle,
    updateArticle: updateArticle
};

exports.saveArticle = function(name, category, price, description, amount, pic) {
    insertNewArticle(name, category, price, description, amount, pic, resultHandlerForQuery);
};

function resultHandlerForQuery(resultId, pic){
    console.log("Ergebnis: " + resultId);
    insertPicToArticle(resultId, pic, resultHandlerForPic);
}

function resultHandlerForPic(resultId){
    // TODO: Feedback ans FE.
}

function insertNewArticle(name, category, price, description, amount, pic, callback) {

    pool.connect(function (err, client, done) {
        if (err) throw err;

        // execute a query on our database
        var queryText = "INSERT INTO public.article (name, category, price, description, amount) VALUES($1, $2, $3, $4, $5) RETURNING id";
        client.query(queryText, [name, category, price, description, amount], function(err, result) {
            if (err) throw err;
            else{
                done(); // close Clientconnection
                console.log("Neuer Artikel eingefuegt in Zeile: " , result.rows[0].id);
                callback (result.rows[0].id, pic);
            }
        });
    });
}

function insertPicToArticle(id, imgData, callback) {

    pool.connect(function (err, client, done) {
        if (err) throw err;
        fs.readFile(loc_on_disk, 'hex', function(err, imgData) {
            console.log('imgData',imgData);
            imgData = '\\x' + imgData;
            client.query("UPDATE public.article SET image=? VALUES($1) WHERE id='"+id+"'",
                [imgData],
                function(err, result) {
                    if (err) throw err; // Errorhandling

                    console.log('err',err,'pg writeResult',result);
                    done(); // close Clientconnection
                    callback(result.rows[0].id);
                });
        });
    });
}

function getAllArticles(req, res, next) {
    db.any('select * from articles')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL articles'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSingleArticle(req, res, next) {
    var articleID = parseInt(req.params.id);
    db.one('select * from articles where id = $1', articleID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE article'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createArticle(req, res, next) {
    req.body.price = parseInt(req.body.price);
    req.body.quantity = parseInt(req.body.quantity);
    req.body.available = req.body.available.toString();
    db.none('insert into articles(name, category, price, description, quantity, available)' +
        'values(${name}, ${category}, ${price}, ${description}, ${amount}, ${quantity}, ${available})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one article'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateArticle(req, res, next) {
    db.none('update pups set name=$1 where id=$2',
        [req.body.name, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated puppy'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

