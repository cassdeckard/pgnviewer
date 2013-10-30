//dummy data
pgnData = [
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
  ],
  [
    '[Event "Glorney Cup-A"]',
    '[Site "Oakham"]',
    '[Date "1997.??.??"]',
    '[Round "4"]',
    '[White "Williams, Simon Kim"]',
    '[Black "Benitah, Yohan"]',
    '[Result "1-0"]',
    '[ECO "A21"]',
    '[WhiteElo "2310"]',
    '[BlackElo "2350"]',
    '[PlyCount "115"]',
    '[EventDate "1997.??.??"]',
    '[EventType "team"]',
    '[EventRounds "5"]',
    '[EventCountry "ENG"]',
    '[Source "ChessBase"]',
    '[SourceDate "2000.11.22"]',
    '[WhiteTeamCountry "ENG"]',
    '[BlackTeamCountry "ENG"]',
    '',
    '1. c4 e5 2. Nc3 Bb4 3. Nd5 Be7 4.',
    'd4 d6 5. e3 Nf6 6. Nxe7 Qxe7 7. Ne2 O-O 8. d5 a5 9. Nc3 Na6 10. Be2 e4 11. b3',
    'Nd7 12. O-O f5 13. Bb2 Ne5 14. Nb5 Bd7 15. Nd4 Nc5 16. Bc3 Rf6 17. g3 Rh6 18.',
    'Nb5 Bxb5 19. cxb5 Ncd7 20. Rc1 g5 21. Bd4 g4 22. Rxc7 Nf3+ 23. Bxf3 gxf3 24.',
    'Bb2 Kf7 25. Qd4 Rg8 26. Rfc1 Qh4 27. Qf6+ Rxf6 28. Rxd7+ Ke8 29. Rxb7 Rff8 30.',
    'Rc8+ Qd8 31. Rxd8+ Kxd8 32. b6 h5 33. Bg7 Re8 34. Rc7 Rxg7 35. Rxg7 Kc8 36. Ra7',
    'Kb8 37. Kf1 Rc8 38. Rc7 Rxc7 39. bxc7+ Kxc7 40. Ke1 Kb6 41. Kd2 Kc5 42. Kc3',
    'Kxd5 43. b4 axb4+ 44. Kxb4 Kc6 45. Kc4 Kb6 46. Kd5 Kb5 47. a3 Ka4 48. Kxd6 Kb3',
    '49. a4 Kc2 50. a5 Kd2 51. a6 Ke2 52. a7 Kxf2 53. a8=Q Kg1 54. Qa1+ Kxh2 55. Qf1',
    'Kxg3 56. Qg1+ Kh3 57. Ke5 h4 58. Kf4 1-0'
  ],
  [
    '[Event "GM"]',
    '[Site "Biel SUI"]',
    '[Date "2002.07.30"]',
    '[Round "8"]',
    '[White "Smirin,I"]',
    '[Black "Korchnoi,V"]',
    '[Result "1/2-1/2"]',
    '[WhiteElo "2676"]',
    '[BlackElo "2626"]',
    '[EventDate "2002.07.22"]',
    '[ECO "C09"]',
    '',
    '1. e4 e6 2. d4 d5 3. Nd2 c5 4. Ngf3 Nc6 5. exd5 exd5 6. Bb5 Qe7+ 7. Qe2',
    'cxd4 8. Nxd4 Qxe2+ 9. Kxe2 Bd7 10. N2b3 Nxd4+ 11. Nxd4 Bc5 12. Be3 Bxb5+',
    '13. Nxb5 Bxe3 14. Kxe3 Kd7 15. Rhd1 Nf6 16. f3 Rhe8+ 17. Kf2 a6 18. Nd4 Re5',
    '19. Rd3 Rae8 20. Rad1 Kc7 21. Rc3+ Kb8 22. Rb3 Rc8 23. g4 Nd7 24. Re3 f6',
    '25. f4 Rxe3 26. Kxe3 Nb6 27. b3 g6 28. Kf3 Kc7 29. Re1 Kd7 30. Re3 Na8 31.',
    'Kf2 Nc7 32. a4 Re8 33. Rh3 Re7 34. f5 Kd6 35. c3 b5 36. a5 b4 37. Re3 bxc3',
    '38. Rxe7 Kxe7 39. Ke3 gxf5 40. gxf5 Kd6 41. Kd3 Ke5 1/2-1/2'
  ]
];

function writeGameText(g) {

  //Write the game to the DOM
  //remove the header to get the moves
  var h = g.header();
  var gameHeaderText = '<h4>' + h.White + ' (' + h.WhiteElo + ') - ' + h.Black + ' (' + h.BlackElo + ')</h4>';
  gameHeaderText += '<h5>' + h.Event + ', ' + h.Site + ' ' + h.EventDate + '</h5>';
  var pgn = g.pgn();
  var gameMoves = pgn.replace(/\[(.*?)\]/gm, '').replace(h.Result, '').trim();

  //format the moves so each one is individually identified, so it can be highlighted
  moveArray = gameMoves.split(/([0-9]+\.\s)/).filter(function(n) {return n;});
  for (var i = 0, l = moveArray.length; i < l; ++i) {
    var s = $.trim(moveArray[i]);
    if (!/^[0-9]+\.$/.test(s)) { //move numbers
      m = s.split(/\s+/);
      for (var j = 0, ll = m.length; j < ll; ++j) {
        m[j] = '<span class="gameMove' + (i + j - 1) + '"><a id="myLink" href="#" onclick="goToMove(' + (i + j - 1) + ');return false;">' + m[j] + '</a></span>';
      }
      s = m.join(' ');
    }
    moveArray[i] = s;
  }
  $("#game-data").html(gameHeaderText + '<div class="gameMoves">' + moveArray.join(' ') + ' <span class="gameResult">' + h.Result + '</span></div>');

}

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
      } else {
        $('#btnNext').click();
      }
      return false;
    }
  });

  $(document).keydown(function(e){
    if (e.keyCode == 37) { //left arrow
      if (e.ctrlKey) {
        $('#btnStart').click();
      } else {
        $('#btnPrevious').click();
      }
    }
    return false;
  });

  $(document).keydown(function(e){
    if (e.keyCode == 38) { //up arrow
      if (currentGame > 0) {
        if (e.ctrlKey) {
          loadGame(0);
        } else {
          loadGame(currentGame - 1);
        }
      }
      $('#gameSelect').val(currentGame);
    }
    return false;
  });

  $(document).keydown(function(e){
    if (e.keyCode == 40) { //down arrow
      if (currentGame < pgnData.length - 1) {
        if (e.ctrlKey) {
          loadGame(pgnData.length - 1);
        } else {
          loadGame(currentGame + 1);
          console.log($('gameSelect').value);
        }
      }
      $('#gameSelect').val(currentGame);
    }
    return false;
  });


});

//used for clickable moves in gametext
//not used for buttons for efficiency
function goToMove(ply) {
  if (ply > gameHistory.length - 1) ply = gameHistory.length - 1;
  game.reset();
  for (var i = 0; i <= ply; i++) {
    game.move(gameHistory[i].san);
  }
  currentPly = i - 1;
  board.position(game.fen());
}

var onChange = function onChange() { //fires when the board position changes
  //highlight the current move
  $("[class^='gameMove']").removeClass('highlight');
  $('.gameMove' + currentPly).addClass('highlight');
}

//start doing stuff
var board, //the chessboard
    game, //the current  game
    games, //array of all loaded games
    gameHistory,
    currentPly,
    currentGame;

function loadGame(i) {
  game = new Chess();
  game.load_pgn(pgnData[i].join('\n'), {newline_char:'\n'});
  writeGameText(game);
  gameHistory = game.history({verbose: true});
  goToMove(-1);
  currentGame = i;
}

//only need the headers here, raise issue on githb?
//read all the games to populate the select
for (var i = 0; i < pgnData.length; i++) {
  var g = new Chess();
  g.load_pgn(pgnData[i].join('\n'), {newline_char:'\n'});
  var h = g.header();
  $('#gameSelect')
     .append($('<option></option>')
     .attr('value', i)
     .text(h.White + ' - ' + h.Black + ', ' + h.Event + ' ' + h.Site + ' ' + h.Date));
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
loadGame(0);