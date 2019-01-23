var express = require("express");
var router = express.Router();
const mongoose = require('mongoose');

const axios = require('axios');
const cheerio = require('cheerio');

const db = require('../models');


mongoose.connect('mongodb://localhost/articleScrapper', {useNewUrlParser: true});


router.get('/', function(req, res){
    
    res.render('index');
    
    // res.send('hit the "/" route');
})

router.get('/scrape', function(req, res){

    axios.get("http://www.echojs.com/").then(function(response){
        var $ = cheerio.load(response.data);
        
        $('article h2').each(function(i, element){
            var result = {};
            // console.log(element);

            result.title = $(this).children('a').text();
            result.link = $(this).children('a').attr('href');

            // console.log(result);

            db.Article.create(result).then(function(dbArticle){
                // console.log(dbArticle);
            }).catch(function(err){
                console.log(err);
            })
        })
        res.render('index');
    })
    // res.send('hit the "/scrape" route');
})

router.get('/scrappedArticles', function(req, res){

    db.Article.find({saved: false}).then(function(dbArticle){
        res.json(dbArticle);
    }).catch(function(err){
        res.json(err);
    });
    // res.send('hit the "/articles" route');
})

router.get('/articlesNotes/:id', function(req, res){

    db.Article.findOne({_id: req.params.id})
    .populate('note')
    .then(function(dbArticle){
        console.log("dbAticle in get: "+dbArticle);
        res.json(dbArticle);
    }).catch(function(err){
        res.json(err);
    })
    
    // res.send('hit the get route "/articles/:id"');
})

router.post('/articlesNotes/:id',function(req, res){

    console.log("req body: "+req.body);
    db.Note.create(req.body).then(function(dbNotes){
        console.log("dbNotes in post: "+dbNotes);      
        return db.Article.findOneAndUpdate({_id:req.params.id}, {note: dbNotes._id}, {new: true});
    }).then(function(dbArticle){
        console.log("dbArticle in post: "+dbArticle);
        res.json(dbArticle);
    }).catch(function(err){
        res.json(err);
    })
    // res.send('hit the post route "/article/:id"');
})

router.get('/deleteArticles', function(req, res){

    db.Article.collection.drop().then(function(){
        res.render('index');
    })
})

router.get('/saved', function(req, res){
    
    db.Article.find({saved: true}).then(function(dbArticle){
        res.json(dbArticle);
    }).catch(function(err){
        res.json(err);
    })
})

router.get('/savedArticles', function(req, res){

    res.render('saved'); 
})

router.get('/savedArticles/:id', function(req, res){
    
    db.Article.update(
        {_id: req.params.id},
        {$set: {saved: true}},
        function(error, edited){
            if (error){
                // console.log(error);
                res.send(error);
            }else{
                // console.log(edited);
                res.send(edited);
            }
        })
    // res.render('saved');
})

router.get('/removeArticles/:id', function(req, res){
    
    db.Article.update(
        {_id: req.params.id},
        {$set: {saved: false}},
        function(error, edited){
            if (error){
                // console.log(error);
                res.send(error);
            }else{
                // console.log(edited);
                res.send(edited);
            }
        })
    // res.render('saved');
})
module.exports = router;