var express = require('express');
var webShop = express();
var router = express.Router();
var jwt = require('express-jwt');
var cors = require('cors');

webShop.use(cors());

var authCheck = jwt ({
    secret: new Buffer('vuwhTlBuANiJwUQrLvCMi3Fjox-H7i2iD5FnCfDQMBYlzCcAqeY2DxA0HpqVI9Jc', 'base64'),
    audience: 'isUbGeB1HMvLalvQ9U6G69vBQwnQaFpZ'
});

webShop.get('/api/public', function(req, res) {
    res.json({message:"hello from public endpoint. You dont need to be authenticated to see this"});
});

webShop.get('/api/private', authCheck, function(req, res) {
    res.json({message:"hello from private endpoint. You need to be authenticated to see this"});
});


var db = require('../core/db/articles');
var interestedPersonDb = require('../core/db/interestedPerson');


router.get('/api/article', db.getAllArticles);
router.get('/api/article/:id', db.getSingleArticle);
router.post('/api/article', db.createArticle);
router.put('/api/article/:id', db.updateArticle);
router.delete('/api/article/:id', db.removeArticle);

router.get('/api/interestedPersons', interestedPersonDb.getAllPersons);
router.post('/api/interestedPerson', interestedPersonDb.saveInterestedPerson);

module.exports = router;