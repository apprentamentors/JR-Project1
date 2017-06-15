function Game() {
  this.power = true;
  this.count = 0;
  this.strictMode = false;
  this.start = false;
  this.computerPattern = [];
  this.playerPattern = [];
  this.buttons = [1,2,3,4];
}


Game.prototype.startGame = function() {
  this.start = true;
}

Game.prototype.togglePower = function() {
  this.power = !this.power;
}

Game.prototype.patternCompare = function(pattern1, pattern2) {

}


Game.prototype.incrementCount = function() {
  this.count++;
}
