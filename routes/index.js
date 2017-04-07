var express = require('express');
var router = express.Router();

var db = require('../core/db/articles');
var interestedPersonDb = require('../core/db/interestedPerson');
var login = require('../core/db/user');

var contact = require('../core/contact.controller');
var newmember = require('../core/member.controller');


router.get('/api/article', db.getAllArticles);
router.get('/api/article/category/:category', db.getArticleCategory);
router.get('/api/article/headCategory/:category', db.getArticleHeadCategory);
router.get('/api/article/:id', db.getSingleArticle);
router.post('/api/article', db.createArticle);
router.put('/api/article/:id', db.updateArticle);
router.delete('/api/article/:id', db.removeArticle);

router.get('/api/interestedPersons', interestedPersonDb.getAllPersons);
router.post('/api/interestedPerson', interestedPersonDb.saveInterestedPerson);

router.post('/api/userLogin', login.isLoggedIn);

router.post('/contact-form', contact.sendMail);

router.post('/member-form', newmember.sendMail);

module.exports = router;
