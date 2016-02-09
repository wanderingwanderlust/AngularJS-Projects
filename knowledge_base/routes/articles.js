var express = require('express');
var router = express.Router();

var Article = require('../models/article');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //We want to get a list of articles
  Article.getArticles(function(err, articles){
    if(err){
      console.log(err);
    }
    res.json(articles);
  });
});

router.get('/:id', function(req, res, next) {
  //We want to get a list of articles
  Article.getArticleById(req.params.id, function(err, article){
    if(err){
      console.log(err);
    }
    res.json(article);
  });
});



router.get('/category/:category', function(req, res, next) {
  //We want to get a list of articles
  Article.getArticlesByCategory(req.params.category, function(err, articles){
    if(err){
      console.log(err);
    }
    res.json(articles);
  });
});


router.post('/', function(req,res,next){
  //Get form values
  var title = req.body.title;
  var category = req.body.category;
  var body = req.body.body;

  //Article Object
  var newArticle = new Article({
    title: title,
    category: category,
    body: body
  });

  //Create Article
  Article.createArticle(newArticle, function(err, article){
    if(err){
      console.log(err);
    }


    res.location('/articles');
    res.redirect('/articles');
  });
});

//Update
router.put('/', function(req,res,next){
  var id = req.body.id;
  var data ={
    title: req.body.title,
    category: req.body.category,
    body: req.body.body
  };

  Article.updateArticle(id, function(err, article){
    if(err){
      console.log(err);
    }


    res.location('/articles');
    res.redirect('/articles');
  });
});


//delete

router.delete('/:id', function(req,res,next){
  var id = req.params.id;

  Article.removeArticle(id, function(err, article){
    if(err){
      console.log(err);
    }

    res.location('/articles');
    res.redirect('/articles');
  });
});




module.exports = router;
