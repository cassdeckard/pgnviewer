//dummy data
pgn =
[
  '[Event "Euro Club Cup"]',
  '[Site "Kallithea GRE"]',
  '[Date "2008.10.18"]',
  '[EventDate "2008.10.17"]',
  '[Round "2"]',
  '[Result "1-0"]',
  '[White "Simon Ansell"]',
  '[Black "J Garcia-Ortega Mendez"]',
  '[ECO "B27"]',
  '[WhiteElo "2410"]',
  '[BlackElo "2223"]',
  '[PlyCount "29"]',
  '',
  '1. e4 c5 2. Nf3 g6 3. d4 cxd4 4. Qxd4 Nf6 5. e5 Nc6 6. Qa4 Nd5 7. Qe4 Ndb4 8. Bb5 Qa5 9. Nc3 d5 10. exd6 Bf5 11. d7+ Kd8 12. Qc4 Nxc2+ 13. Ke2 Nxa1 14. Rd1 Be6 15. Qxe6 1-0'
];

var board,
    game,
    gameHistory,
    currentMove

//set up the game
game = new Chess();
game.load_pgn(pgn.join('\n'));

//store the game we just loaded in memory
gameHistory = game.history({verbose:true});

//bask to the start, we will use the gameHistory object to move through the game
game.reset();
currentMove = 0; //pointer to the gameHistory index of the position on the board - gameHistory[currentMove] is the next move to be made

//set up the board
var cfg = {
  pieceTheme: '/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
  position: 'start',
  showNotation: false
};
board = new ChessBoard('board', cfg);

//buttons
$('#btnStart').on('click', function() {
  game.reset();
  board.position(game.fen());
  currentMove = 0;
});
$('#btnPrevious').on('click', function() {
  if (currentMove > 0) {
    game.undo();
    board.position(game.fen());
    currentMove--;
  }
});
$('#btnNext').on('click', function() {
  if (currentMove < gameHistory.length) {
    game.move(gameHistory[currentMove].san);
    board.position(game.fen());
    currentMove++;
  }
});
$('#btnEnd').on('click', function() {
  while (currentMove < gameHistory.length) {
    game.move(gameHistory[currentMove].san);
    currentMove++;
  }
  board.position(game.fen());
});

//key bindings
$(document).ready(function(){
  $(document).keydown(function(e){
    if (e.keyCode == 39) { //right arrow
      $('#btnNext').click();
      return false;
    }
  });
  $(document).keydown(function(e){
    if (e.keyCode == 37) { //left arrow
      $('#btnPrevious').click();
      return false;
    }
  });
});