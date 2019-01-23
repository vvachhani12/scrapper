const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const routes = require('./controller/scrapper_controller');


// const axios = require('axios');
// const cheerio = require('cheerio');


const app = express();

// const db = require('./models');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// app.use(express.static('public'));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname+"/public"));

// mongoose.connect('mongodb://localhost/scrapper', {useNewUrlParser: true});

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(routes);

app.listen(PORT, function(){
    console.log('Server listening on http://localhost:'+ PORT);
})