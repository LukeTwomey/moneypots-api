
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

// MongoDB
mongoose.Promise = global.Promise;
var promise = mongoose.connect('mongodb://localhost/pots');

promise.then(function(db) {
  console.log('MONGO CONNECTED');
}).catch(function(err) {
  console.log('CONNECTION ERROR', err);
});

// Schema set up
var potSchema = mongoose.Schema({
  name: { type: String, default: '' },
  accountName: { type: String, default: '' },
  balance: { type: Number, default: 0 },
  target: { type: Number, default: 0 },
  icon: { type: String, default: '' },
  progress: { type: Number, default: 0 },
  progressBarColor: { type: String, default: '#06b127' },
  summaryActive: { type: Boolean, default: true },
  depositFundsActive: { type: Boolean, default: false },
  withdrawFundsActive: { type: Boolean, default: false },
  settingsActive: { type: Boolean, default: false },
  deleteActive: { type: Boolean, default: false },
  preventWithdraw: { type: Boolean, default: false },
});

// Compile schema into a model
var Pot = mongoose.model('Pot', potSchema);

export function getPots(callback){
  Pot.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      callback(result);
    }
  });
}

export function createPot(potDetails, callback){
  var newPot = new Pot(potDetails);
  newPot.save(function(err, result) {
    if(err) {
      console.log(err);
    } else {
      callback();
    }
  });
}

export function deletePot(potDetails, callback){
  Pot.deleteOne({_id: ObjectId(potDetails._id)}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
}

export function deposit(body, callback){
  var depositAmount = parseFloat(body.depositAmount);
  Pot.update(
    {_id: ObjectId(body.potDetails._id)}, 
    {$inc: {balance: depositAmount}},
   function(err, result) {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
}

export function withdraw(body, callback){
  var withdrawalAmount = - parseFloat(body.withdrawalAmount);
  Pot.update(
    {_id: ObjectId(body.potDetails._id)}, 
    {$inc: {balance: withdrawalAmount}},
   function(err, result) {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
}

export function updateSettings(potDetails, callback){
  Pot.update(
    {_id: ObjectId(potDetails._id)}, 
    { 
      name: potDetails.name,
      accountName: potDetails.accountName,
      balance: potDetails.balance,
      target: potDetails.target,
      icon: potDetails.icon,
      progress: potDetails.progress,
      progressBarColor: potDetails.progressBarColor,
      summaryActive: potDetails.summaryActive,
      depositFundsActive: potDetails.depositFundsActive,
      withdrawFundsActive: potDetails.withdrawFundsActive,
      settingsActive: potDetails.settingsActive,
      deleteActive: potDetails.deleteActive,
      preventWithdraw: potDetails.preventWithdraw
    },
   function(err, result) {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
}

export function updateProgress(potDetails, callback){
  Pot.update(
    {_id: ObjectId(potDetails._id)}, 
    {progress: potDetails.progress},
   function(err, result) {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
}

export function updateProgressBarColor(potDetails, callback){
  Pot.update(
    {_id: ObjectId(potDetails._id)}, 
    {progressBarColor: potDetails.progressBarColor},
   function(err, result) {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
}