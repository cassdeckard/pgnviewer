//dummy data
pgnData =
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
    currentPly;

//set up the game
game = new Chess();
game.load_pgn(pgnData.join('\n'), {newline_char:'\n'});

//store the game we just loaded in memory
gameHistory = game.history({verbose:true});

//Write the game to the DOM
//remove the header to get the moves
var h = game.header();
var gameHeaderText = '<h4>' + h.White + ' (' + h.WhiteElo + ') - ' + h.Black + ' (' + h.BlackElo + ')</h4>';
gameHeaderText += '<h5>' + h.Event + ', ' + h.Site + ' ' + h.EventDate + '</h5>';
var gameMoves = game.pgn().replace(/\[(.*?)\]/gm, '').replace(h.Result, '').trim();

//format the moves so each one is individually identified, so it can be highlighted
moveArray = gameMoves.split(/([0-9]+\.\s)/).filter(function(n) {return n;});
for (var i = 0, l = moveArray.length; i < l; ++i) {
  var s = $.trim(moveArray[i]);
  if (!/^[0-9]+\.$/.test(s)) { //move numbers
    m = s.split(/\s+/);
    for (var j = 0, ll = m.length; j < ll; ++j) {
      m[j] = '<span class="gameMove' + (i + j - 1) + '">' + m[j] + '</span>';
    }
    s = m.join(' ');
  }
  moveArray[i] = s;
}
$("#game-data").html(gameHeaderText + '<div class="gameMoves">' + moveArray.join(' ') + ' <span class="gameResult">' + h.Result + '</span></div>');

//bask to the start, we will use the gameHistory object to move through the game
game.reset();
currentPly = -1; // -1 = beginning of game

//buttons
$('#btnStart').on('click', function() {
  game.reset();
  currentPly = -1;
  board.position(game.fen());
});
$('#btnPrevious').on('click', function() {
  if (currentPly > 0) {
    game.undo();
    currentPly--;
    board.position(game.fen());
  }
});
$('#btnNext').on('click', function() {
  if (currentPly < gameHistory.length - 1) {
    currentPly++;
    game.move(gameHistory[currentPly].san);
    board.position(game.fen());
  }
});
$('#btnEnd').on('click', function() {
  while (currentPly < gameHistory.length - 1) {
    currentPly++;
    game.move(gameHistory[currentPly].san);
  }
  board.position(game.fen());
});

//key bindings
$(document).ready(function(){

  $(document).keydown(function(e){
    if (e.keyCode == 39) { //right arrow
      if (e.ctrlKey) {
        $('#btnEnd').click();
        return false;
      } else {
        $('#btnNext').click();
        return false;
      }
    }
  });

  $(document).keydown(function(e){
    if (e.keyCode == 37) { //left arrow
      if (e.ctrlKey) {
        $('#btnStart').click();
        return false;
      } else {
        $('#btnPrevious').click();
        return false;
      }
    }
  });

});

var onChange = function onChange() { //fires when the board position changes
  //highlight the current move
  $("[class^='gameMove']").removeClass('highlight');
  $('.gameMove' + currentPly).addClass('highlight');
}

//set up the board
var cfg = {
  pieceTheme: '/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
  position: 'start',
  showNotation: false,
  onChange: onChange
};
board = new ChessBoard('board', cfg);
$(window).resize(board.resize);