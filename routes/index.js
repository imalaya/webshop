var express = require('express');
var router = express.Router();

var db = require('../core/db/articles');


router.get('/api/article', db.getAllArticles);
router.get('/api/article/:id', db.getSingleArticle);
router.post('/api/article', db.createArticle);
router.put('/api/puppies/:id', db.updateArticle);

/*
 router.delete('/api/puppies/:id', db.removeArticle);*/


module.exports = router;