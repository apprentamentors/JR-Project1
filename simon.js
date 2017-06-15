var Game = {
  count: 0,
  playerTurn: false,
  computerTurn: false,
  gameStarts: function() {

    //this.defineButtonHandlers();
    //$('.square').unbind('click');
    $('.startBtn').unbind('click');

    // this.count++;
    // this.render();
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
    //$('body').on('computer-turn', Computer.move.bind(Computer));
    $('body').on('computer-turn', Computer.move.bind(Computer));
    $('body').on('computer-finished', this.swapTurn.bind(this));
    $('body').on('player-finished', this.nextRound.bind(this));
    $('.square').on('click', this.buttonAnimation);
    $('.square').on('click', this.buttonLogic);
    //$('body').on('player-turn', )
  },


 // Every time a square is clicked this function will make it animate
  buttonAnimation: function() {
    var buttonId = $(this).attr('data-color-id');
    if (buttonId == 1) {
      $(this).animate({backgroundColor: "purple"}, 1000, function(){
        $(this).animate({backgroundColor: "red"}, 1000);
      });
    }
    else if (buttonId == 2) {
      $(this).animate({backgroundColor: "#ffffa8"}, 1000, function(){
        $(this).animate({backgroundColor: "yellow"}, 1000);
      });
    }
    else if (buttonId == 3) {
      $(this).animate({backgroundColor: "#0C7BE8"}, 1000, function(){
        $(this).animate({backgroundColor: "blue"}, 1000);
      });
    }
    else {
      $(this).animate({backgroundColor: "#0DFF23"}, 1000, function(){
        $(this).animate({backgroundColor: "green"}, 1000);
      });
    }

  },


  //Everytime a square is clicked this function will check if the player's turn is set to true.
  //then 
  buttonLogic: function() {



    if (Game.playerTurn == true) {
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
       //this.computerTurn = !this.computerTurn;



  },

  animateCurrentMove: function() {
    // check if moveIndex is past the last move, then stop animating, and trigger a custom event “computerFinishedMoving”

    // trigger a click on the appropriate square
    // increment moveIndex by 1
    // wait 2 seconds, and then call animateCurrenMove again
    $('[data-color-id="' + this.pattern[i] + '"]').trigger('click');
    $('[data-color-id="' + this.pattern[i] + '"]').animate({backgroundColor: "blue"}, 1000, function(){
      $(this).animate({backgroundColor: "red"}, 1000);
    });




  },

  nextRound: function() {
    this.count++;
    this.render();
    this.swapTurn();
    $('body').trigger('computer-turn');
  },

  defineButtonHandlers: function() {

    // $('#red').click(function(e){
    //
    //   $(this).animate({backgroundColor: "blue"}, 1000, function(){
    //     $(this).animate({backgroundColor: "red"}, 1000);
    //   });
    // });


  },

  render: function() {
    $('.count-status').html(this.count)
  },

  animation: function() {

  }

//.animate({backgroundColor: "red"}, 1000);


}

var Computer = {
  pattern: [],

  listeners: function() {
    //$('body').on('computer-turn', this.move.bind(this));

  },
  move: function() {
    $('h1').html('Computers Turn');
    var self = this;
    console.log('computers moving');
    var choice = this.generateRandomChoice();
    this.pattern.push(choice);
    console.log(this.pattern);
    var i = 0;
    animateCurrentMove();

    function animateComputerMoves() {
       animateCurrentMove();

    }

    function animateCurrentMove() {
    	// check if moveIndex is past the last move, then stop animating, and trigger a custom event “computerFinishedMoving”

    	// trigger a click on the appropriate square
    	// increment moveIndex by 1
    	// wait 2 seconds, and then call animateCurrenMove again
      if (i == self.pattern.length) {
        console.log('finished');
        //Game.computerTurn == Game.computerTurn;
        $('body').trigger('computer-finished');
      }
      else {
        $('[data-color-id="' + self.pattern[i] + '"]').trigger('click');
        i++;

        setTimeout(animateCurrentMove,2000);
      }






      // $('[data-color-id="' + this.pattern[i] + '"]').animate({backgroundColor: "blue"}, 1000, function(){
      //   $(this).animate({backgroundColor: "red"}, 1000);
      // });




    };
      // for (var i = 0; i < this.pattern.length; i++) {
      //
      //   $('[data-color-id="' + this.pattern[i] + '"]').trigger('click');
      //
      //
      //
      //
      //   // if (this.pattern[i] == 1) {
      //   //   $('[data-color-id="' + this.pattern[i] + '"]').animate({backgroundColor: "blue"}, 1000).animate({backgroundColor: "red"}, 1000);
      //   // }
      //   // else if (this.pattern[i] == 2) {
      //   //   $('[data-color-id="' + this.pattern[i] + '"]').animate({backgroundColor: "#ffffa8"}, 1000).animate({backgroundColor: "yellow"}, 1000);;
      //   // }
      //   //
      //   // else if (this.pattern[i] == 3) {
      //   //   $('[data-color-id="' + this.pattern[i] + '"]').animate({backgroundColor: "#0C7BE8"}, 1000).animate({backgroundColor: "blue"}, 1000);;
      //   // }
      //   //
      //   // else {
      //   //   $('[data-color-id="' + this.pattern[i] + '"]').animate({backgroundColor: "#0DFF23"}, 1000).animate({backgroundColor: "green"}, 1000);;
      //   // }
      //
      //
      // }



    //$('body').trigger('computer-finished');

    //Player.move();

  },

  generateRandomChoice: function() {
      return Math.floor(Math.random() * 4 + 1);
  },


}

var Player = {
  playerPattern: [],
  playerMoveCount: 0,
  listeners: function(){

    // $('.square').on('click', function() {
    //    var playerChoice = parseInt($(this).attr('data-color-id'));
    //    Player.move(playerChoice);
    //  });
  },
  move: function(move) {


    //var playerChoice = parseInt($(this).attr('data-color-id'));
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
    // var playerMoveCount = 0;
    // console.log('player move Count before click '+ playerMoveCount);
    //
    // console.log('players turn');
    // $('.square').on('click',function(e) {
    //   e.preventDefault();
    //
    //   var playerChoice = parseInt($(this).attr('data-color-id'));
    //   console.log(playerChoice);
    //   var mo = playerMoveCount;
    //
    //   //Player.playerPattern.push(playerChoice);
    //   var validation = Game.validateChoice(playerChoice, playerMoveCount);
    //   console.log('player move Count after validation is '+ playerMoveCount);
    //
      // if (validation) {
      //   console.log('correct');
      //   playerMoveCount++;
      //   console.log('player move Count after click is '+ playerMoveCount);
      //   if(Game.count == playerMoveCount ) {
      //
      //     console.log('correct players turn is done');
      //     $('body').trigger('player-finished');
      //     //Game.gameStarts();
      //   }
      // }
      //
      //
      // else {
      //   console.log('wrong');
      //   console.log('player move Count after click is '+ playerMoveCount);
      //   playerMoveCount = 0;
      // }
    //
    //
    //
    //
    //
    // })

  },
}

$('.startBtn').on('click', function() {

  Game.gameStarts();
}.bind(Game));
