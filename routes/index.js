var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/article', db.getAllArticles);
/*router.get('/api/puppies/:id', db.getSingleArticle);
 router.post('/api/puppies', db.createArticle);
 router.put('/api/puppies/:id', db.updateArticle);
 router.delete('/api/puppies/:id', db.removeArticle);*/


module.exports = router;