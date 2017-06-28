

/******GAME OBJECT******/
var Game = {
  count: 0,
  playerTurn: false,
  computerTurn: false,
  gameStarts: function() {

    $('.startBtn').unbind('click');
    this.listeners();
    this.count++;
    //Computer.move();
    $('body').trigger('computer-turn');
  },

  validateChoice: function(color, moveCount) {

      if (Computer.pattern[moveCount] == color) {
        return true;
      }
      else {
        return false;
      }

  },
  listeners: function() {

    $('body').on('computer-turn', Computer.move.bind(Computer));
    $('body').on('computer-finished', this.swapTurn.bind(this));
    $('body').on('player-finished', this.nextRound.bind(this));
    $('.square').on('click', this.buttonAnimation);
    $('.square').on('clickAnimationFinished', this.buttonLogic);
    //$('.square')on('clickAnimationFinished', )

  },


 // Every time a square is clicked this function will make it animate
  buttonAnimation: function() {

    var buttonId = $(this).attr('data-color-id');
    console.log($(this));


    if (buttonId == 1) {
      $(this).animate({opacity: ".75"}, 500, function(){
        $(this).animate({opacity: "1"}, 500, function() {

          $(this).trigger("clickAnimationFinished");
        });
      });
    }
    else if (buttonId == 2) {
      $(this).animate({backgroundColor: "#ffffa8"}, 500, function(){
        $(this).animate({backgroundColor: "yellow"}, 500, function() {

          $(this).trigger("clickAnimationFinished");
        });
      });
    }
    else if (buttonId == 3) {
      $(this).animate({backgroundColor: "#0C7BE8"}, 500, function(){
        $(this).animate({backgroundColor: "blue"}, 500, function() {

          $(this).trigger("clickAnimationFinished");
        });
      });
    }
    else {
      $(this).animate({backgroundColor: "#0DFF23"}, 500, function(){
        $(this).animate({backgroundColor: "green"}, 500, function() {

          $(this).trigger("clickAnimationFinished");
        });
      });
    }

  },


  //Everytime a square is clicked this function will check if the player's turn is set to true.
  //then
  buttonLogic: function() {


    if (Game.playerTurn == true) {
      debugger;
      var button = $(this).attr('data-color-id');
      var validation = Game.validateChoice(button, Player.playerMoveCount);

      if (validation) {
        console.log(button);
        console.log('correct');
        Player.playerMoveCount++;

        if(Game.count == Player.playerMoveCount ) {

          console.log('correct players turn is done');
          Player.playerMoveCount = 0;
          //$('.square').unbind('click');
          $('body').trigger('player-finished');
          //Game.gameStarts();
        }
      }


      else {
        console.log('wrong');

        Player.playerMoveCount = 0;
      }
    }

  },

  swapTurn: function() {


       this.playerTurn = !this.playerTurn;
       if (this.playerTurn == true) {
         $('h1').html('Player Turn');
       }




  },

  nextRound: function() {
    this.count++;
    this.render();
    this.swapTurn();
    $('body').trigger('computer-turn');
  },


  render: function() {
    $('.count-status').html(this.count)
  },


}




/******COMPUTER OBJECT******/
var Computer = {
  pattern: [],


  move: function() {
    $('h1').html('Computers Turn');
    //var self = this;
    console.log('computers moving');
    var choice = this.generateRandomChoice();
    this.pattern.push(choice);
    console.log(this.pattern);
    var i = 0;
    this.animateCurrentMove();

    function animateComputerMoves() {
       animateCurrentMove();

       // define a listener for the "clickFinishedAnimating" ==> THEN call animateCurrentMove() in your handler

       $(".square").on("clickFinishedAnimating", this.animateCurrentMove)

       // remember to remove this listener when the computer's is over.
       //

    };

    function animateCurrentMove() {
    	// check if moveIndex is past the last move, then stop animating, and trigger a custom event “computerFinishedMoving”

    	// trigger a click on the appropriate square
    	// increment moveIndex by 1
    	// wait 2 seconds, and then call animateCurrenMove again
      if (i == self.pattern.length) {
        console.log('finished');
        //Game.computerTurn == Game.computerTurn;
        $(".square").unbind("clickFinishedAnimating");
        $('body').trigger('computer-finished');
      }
      else {
        $('[data-color-id="' + self.pattern[i] + '"]').trigger('click');
        i++;

        //setTimeout(animateCurrentMove,2000); //Don't need this anymore.
      }
    };


  },

  generateRandomChoice: function() {
      return Math.floor(Math.random() * 4 + 1);
  },


}



/******PLAYER OBJECT******/
var Player = {
  playerPattern: [],
  playerMoveCount: 0,

  move: function(move) {



       console.log(move);
       var validation = Game.validateChoice(move, this.playerMoveCount);

       if (validation) {
         console.log('correct');
         this.playerMoveCount++;

         if(Game.count == this.playerMoveCount ) {

           console.log('correct players turn is done');
           this.playerMoveCount = 0;
           //$('.square').unbind('click');
           $('body').trigger('player-finished');
           //Game.gameStarts();
         }
       }


       else {
         console.log('wrong');

         this.playerMoveCount = 0;
       }

  },
}

$('.startBtn').on('click', function() {

  Game.gameStarts();
}.bind(Game));
