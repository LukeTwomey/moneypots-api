
import * as potService from './shared/pot.service';

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var fs         = require('fs');

var icons = [];

// Read images (icons) directory contents and push into icons array, ready for front-end when it requests the data
fs.readdir('./assets', (err, files) => {
  files.forEach(file => {
    if( file.indexOf('.png') !== -1 ) {
      icons.push(file);
    }
  });
})

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allow cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// create static route to allow express to server the static image files used for the pot icons
app.use('/images', express.static('assets'));

var port = process.env.PORT || 4100;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/pots/getPots', function(req, res) {
  potService.getPots(function(result) {
    res.json(result);
  });
});

router.get('/pots/getIcons', function(req, res) {
  res.json(icons);
});

router.post('/pots/createPot', function(req, res) {
  potService.createPot(req.body, function() {
    potService.getPots(function(result) {
      res.json(result);
    });
  });
});

// First delete the pot, then when you have confirmation of deletion from the callback, 
// get the remaining pots and return them to the front-end
router.post('/pots/deletePot', function(req, res) {
  potService.deletePot(req.body, function() {
    potService.getPots(function(result) {
      res.json(result);
    });
  });
});

router.post('/pots/deposit', function(req, res) {
  potService.deposit(req.body, function() {
    potService.getPots(function(result) {
      res.json(result);
    });
  });
});

router.post('/pots/withdraw', function(req, res) {
  potService.withdraw(req.body, function() {
    potService.getPots(function(result) {
      res.json(result);
    });
  });
});

router.post('/pots/updateSettings', function(req, res) {
  potService.updateSettings(req.body, function() {
    potService.getPots(function(result) {
      res.json(result);
    });
  });
});

router.post('/pots/updateProgress', function(req, res) {
  potService.updateProgress(req.body, function() {
    potService.getPots(function(result) {
      res.json(result);
    });
  });  
});

router.post('/pots/updateProgressBarColor', function(req, res) {
  potService.updateProgressBarColor(req.body, function() {
    potService.getPots(function(result) {
      res.json(result);
    });
  });  
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('API now listening on port ' + port);