var express = require('express');
var router = express.Router();

var Category = require('../models/category');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //We want to get a list of articles
    Category.getCategories(function(err, categories){
        if(err){
            console.log(err);
        }
        res.json(categories);
    });
});

router.get('/:id', function(req, res, next) {
    //We want to get a list of articles
    Category.getCategoryById(req.params.id, function(err, category){
        if(err){
            console.log(err);
        }
        res.json(category);
    });
});



module.exports = router;
