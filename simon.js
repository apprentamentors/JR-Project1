var Game = {
  count: 0,
  gameStarts: function() {
    $('.square').unbind('click');
    $('.startBtn').unbind('click');
    this.count++;
    this.render();
    Computer.move();
  },

  validateChoice: function(color, moveCount) {

      if (Computer.pattern[moveCount] == color) {
        return true;
      }
      else {
        return false;
      }

  },

  render: function() {
    $('.count-status').html(this.count)
  },

  animation: function() {

  }




}

var Computer = {
  pattern: [],
  move: function() {

    console.log('computers turn');
    var choice = this.generateRandomChoice();
    this.pattern.push(choice);
    console.log(this.pattern);

      for (var i = 0; i < this.pattern.length; i++) {

        if (this.pattern[i] == 1) {
          $('[data-color-id="' + this.pattern[i] + '"]').animate({backgroundColor: "blue"}, 1000).animate({backgroundColor: "red"}, 1000);
        }
        else if (this.pattern[i] == 2) {
          $('[data-color-id="' + this.pattern[i] + '"]').animate({backgroundColor: "#ffffa8"}, 1000).animate({backgroundColor: "yellow"}, 1000);;
        }

        else if (this.pattern[i] == 3) {
          $('[data-color-id="' + this.pattern[i] + '"]').animate({backgroundColor: "#0C7BE8"}, 1000).animate({backgroundColor: "blue"}, 1000);;
        }

        else {
          $('[data-color-id="' + this.pattern[i] + '"]').animate({backgroundColor: "#0DFF23"}, 1000).animate({backgroundColor: "green"}, 1000);;
        }


      }



    Player.move();

  },

  generateRandomChoice: function() {
      return Math.floor(Math.random() * 4 + 1);
  },


}

var Player = {
  playerPattern: [],
  move: function() {


    var playerMoveCount = 0;
    console.log('players turn');
    $('.square').on('click', function(e) {

      var playerChoice = parseInt($(this).attr('data-color-id'));
      console.log(playerChoice);
      //Player.playerPattern.push(playerChoice);
      var validation = Game.validateChoice(playerChoice, playerMoveCount);
      if (validation) {
        console.log('correct');
        playerMoveCount++;
        if(Game.count == playerMoveCount ) {

          console.log('correct players turn is done');
          Game.gameStarts();
        }
      }


      else {
        console.log('wrong');
        playerMoveCount = 0;
      }



    })
  },
}

$('.startBtn').on('click', Game.gameStarts.bind(Game))
