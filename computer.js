function Computer() {
  this.pattern = [];
}

Computer.prototype.randomChoice = function() {
  return this.pattern.push(Math.floor(Math.random() * 4 + 1));
}
