var Game = (function() {

    function Game(computer, player) {
      this.pattern = [0,1,2,3];
      this.gameSeq = [];
      this.turn = 0;
      this.sounds = ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'];
      this.gameState = {
        count: 0,
        start: false,
        strict: false,
        powerSwitch: false
      };
      this.computer = computer;
      this.player = player;

    }



    Game.prototype = {
      constructor: Game,

      startGame: function() {


        if (this.gameState.start == false) {
          this.gameState.start = true;
          this.computer.computerState.turn = true;
          this.eventHandler();
          this.computerTurn();
        }


      },

      strictMode: function() {
        console.log('strict');
        this.gameState.strict = !this.gameState.strict;
        if (this.gameState.strict == true) {
          $('.strict').html('on');
        }
        else {
          $('.strict').html('off');
        }
      },

      eventHandler: function() {
        $('body').on('playerTurn', this.playerTurn.bind(this));
      },

      render: function() {
        $('.count-status').html(this.gameState.count);
      },

      playerTurn: function(){
        setTimeout(function() {
            $('.turn').html("Player Turn");
        }, 2000)

      },

      computerTurn: function() {
        setTimeout(function() {
            $('.turn').html("Computer Turn");
        }, 1000);
        this.runNextMove();
      },

      soundEffect: function(s) {
        var sound = new Audio();
        sound.src = this.sounds[s];
        sound.play();
      },



      runNextMove: function() {

        console.log(this.player.playerState.turn);
        console.log('entered run ' + this.computer.computerState.turn);

          this.gameState.count++;
          this.render();


          var choice = this.computer.generateRandomChoice();
          this.gameSeq.push(choice);
          this.readGameSeq();




      },

      reRunGameSeq: function() {
        if (this.gameState.strict == true) {
          this.gameSeq = [];
          this.gameState.count = 0;
          this.render(); 
          this.gameSeq.push(Math.floor(Math.random() * 4 + 1));
        }
        setTimeout(function() {
          $('.wrong').html('');
        },1000)
        this.readGameSeq();
      },

      readGameSeq: function() {
        var self = this;

        var i = 0;

        function run() {
            this.player.playerState.turn = false;
            setTimeout(function() {
              self.animate(self.gameSeq[i]);
              i++;
              if (i < self.gameSeq.length) {
                  run();
              }
              else {
                console.log('done');
                this.player.playerState.turn = true;
                //self.playerTurn();
                $('body').trigger('playerTurn');
              }


            }, 1800)
        }
        run();


        console.log(this.gameSeq);

      },

      buttonClicked: function(button) {
        console.log(this.player.playerState.turn);

        if (this.player.playerState.turn == true) {
          if (button == this.gameSeq[this.turn]) {
              console.log('correct');
              this.animate(button);
              this.turn++;

              if (this.turn == this.gameSeq.length) {
                  console.log('entered end');
                  this.turn = 0;
                  this.computerTurn();

              }
          }



          else {
            console.log('wrong');
            $('.wrong').html("Wrong");
            console.log(this.turn);
            this.turn = 0;
            this.reRunGameSeq();
          }


        }
      },

      animate: function(button) {
        var index;
        if (button == 1) {
          index = 0;
          button = document.getElementById('red');
        }
        else if (button == 3) {
          index = 2;
          button = document.getElementById('yellow');
        }
        else if (button == 2) {
          index = 1;
          button = document.getElementById('blue');
        }
        else {
          index = 3;
          button = document.getElementById('green');
        }

        this.soundEffect(index);
        $(button).animate({opacity: ".5"}, 500, function() {
          $(button).animate({opacity: "1"}, 500);
        })


      }



      }




    return Game;
})();
