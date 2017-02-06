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
    getAllArticles: getAllArticles,
    getArticleCategory: getArticleCategory,
    getArticleHeadCategory: getArticleHeadCategory,
    getSingleArticle: getSingleArticle,
    createArticle: createArticle,
    updateArticle: updateArticle,
    removeArticle: removeArticle
};



function getAllArticles(req, res, next) {
    db.any('select * from public.articles')
        .then(function (data) {
            res.status(200)
                .json({
                    //status: 'success',
                    data: data
                    //message: 'Retrieved ALL articles'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getArticleCategory(req, res, next) {
    var articleCategory = req.params.category;
    db.any('select * from public.articles where category = $1', articleCategory)
        .then(function (data) {
            res.status(200)
                .json({
                   // status: 'success',
                    data: data
                   // message: 'Retrieved ONE category'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getArticleHeadCategory(req, res, next) {
    var articleHeadCategory = req.params.category;
    db.any('select * from public.articles where headcategory = $1', articleHeadCategory)
        .then(function (data) {
            res.status(200)
                .json({
                    // status: 'success',
                    data: data
                    // message: 'Retrieved ONE category'
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
    // req.body.available = req.body.available.toString();
    db.none('insert into articles(name, category, price, description, quantity, thumb) values ($1, $2, $3, $4, $5, $6)',
        [req.body.name, req.body.category, req.body.price, req.body.description, req.body.quantity, req.body.thumb])
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
    db.none('update articles set name=$1, price=$2, category=$3, quantity=$4 where id=$5',
        [req.body.name, parseInt(req.body.price), req.body.category, parseInt(req.body.quantity), parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated article'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeArticle(req, res, next) {
    var articleID = parseInt(req.params.id);
    db.result('delete from articles where id = $1', articleID)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed ${result.rowCount} article'
        });
    /* jshint ignore:end */
})
.catch(function (err) {
    return next(err);
});
}


/*
 exports.saveArticle = function(name, category, price, description, amount, pic) {
 insertNewArticle(name, category, price, description, amount, pic, resultHandlerForQuery);
 };
 */

/* OLD _________
 function resultHandlerForQuery(resultId, pic){
 console.log("Ergebnis: " + resultId);
 insertPicToArticle(resultId, pic, resultHandlerForPic);
 }

 function resultHandlerForPic(resultId){
 // TODO: Feedback ans FE.
 }
 */

/* OLD ____________________________________________
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
 }*/

/* OLD ____________________________________________
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
 */
