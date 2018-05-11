
var id = 3;

class Pot {

  constructor(potDetails) {
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
  }

}

export default Pot;
