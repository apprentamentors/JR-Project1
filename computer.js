var Computer = (function() {

    function Computer() {
      this.computerState = {
        turn: false
      };

    }

    Computer.prototype = {
      constructor: Computer,
      generateRandomChoice: function() {
          return Math.floor(Math.random() * 4 + 1);
      },

      readCompSeq: function() {
        var i = 0;
        function animateCurrentMove() {
          setTimeout(function() {
            animate(this.compSeq[i]);
            i++;
            if (i < this.compSeq) {
              animateCurrentMove();
            }
          }, 800);
        }
      }
    }

   return Computer;


})();
