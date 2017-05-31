$('button').on('click', function(){
  $('body').trigger('computerMoves');
});

$('body').on('computerMoves', function() {
  console.log('Computer Moves!');
  $('body').trigger('humanMoves');
});

$('body').on('humanMoves', function() {
  console.log('Humans turn!')
  $('.square').on('click', function() {
    console.log('Human moved!');
    $('body').trigger('computerTurn');
  })
});
