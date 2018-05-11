'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var id = 3;

var Pot = function Pot(potDetails) {
  _classCallCheck(this, Pot);

  this.id = id++;
  this.name = potDetails.name;
  this.accountName = potDetails.accountName;
  this.balance = 0;
  this.target = potDetails.target ? potDetails.target : 0;
  this.icon = potDetails.selectedIcon;
  this.progress = 0;
  this.progressBarColor = '#06b127';
  this.summaryActive = true;
  this.depositFundsActive = false;
  this.withdrawFundsActive = false;
  this.settingsActive = false;
  this.deleteActive = false;
  this.preventWithdraw = false;
};

exports.default = Pot;