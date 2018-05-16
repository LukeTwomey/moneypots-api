'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPots = getPots;
exports.createPot = createPot;
exports.deletePot = deletePot;
exports.deposit = deposit;
exports.withdraw = withdraw;
exports.updateSettings = updateSettings;
exports.updateProgress = updateProgress;
exports.updateProgressBarColor = updateProgressBarColor;

var _config = require('../config');

var config = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

console.log(config.uri);

var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

// MongoDB
mongoose.Promise = global.Promise;
var promise = mongoose.connect(config.uri);

promise.then(function (db) {
  console.log('MONGO CONNECTED');
}).catch(function (err) {
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
  preventWithdraw: { type: Boolean, default: false }
});

// Compile schema into a model
var Pot = mongoose.model('Pot', potSchema);

function getPots(callback) {
  Pot.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      callback(result);
    }
  });
}

function createPot(potDetails, callback) {
  var newPot = new Pot(potDetails);
  newPot.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
}

function deletePot(potDetails, callback) {
  Pot.deleteOne({ _id: ObjectId(potDetails._id) }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
}

function deposit(body, callback) {
  var depositAmount = parseFloat(body.depositAmount);
  Pot.update({ _id: ObjectId(body.potDetails._id) }, { $inc: { balance: depositAmount } }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
}

function withdraw(body, callback) {
  var withdrawalAmount = -parseFloat(body.withdrawalAmount);
  Pot.update({ _id: ObjectId(body.potDetails._id) }, { $inc: { balance: withdrawalAmount } }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
}

function updateSettings(potDetails, callback) {
  Pot.update({ _id: ObjectId(potDetails._id) }, {
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
  }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
}

function updateProgress(potDetails, callback) {
  Pot.update({ _id: ObjectId(potDetails._id) }, { progress: potDetails.progress }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
}

function updateProgressBarColor(potDetails, callback) {
  Pot.update({ _id: ObjectId(potDetails._id) }, { progressBarColor: potDetails.progressBarColor }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
}