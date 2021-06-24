var gameMatrix = [];
function createBoard() {
  var boardStart = document.getElementById('gameBoard');

  for (var i = 0; i < 9; ++i) {
    gameMatrix[i] = [];
    for (var j = 0; j < 9; ++j) {
      gameMatrix[i][j] = 0;
    }
  }

  for (var i = 0; i < 9; ++i) {
    for (var j = 0; j < 9; ++j) {
      var cell = document.createElement('BUTTON');
      var cellId = i * 9 + j;
      boardStart.appendChild(cell);
      cell.setAttribute('class', 'puzzleCell');
      cell.setAttribute('id', cellId);
    }

    var br = document.createElement('br');
    boardStart.appendChild(br);
  }

  randomLine();
  for (var i = 1; i < 9; ++i) {
    if (i !== 3 && i !== 6) {
      switch3Left(i);
    } else {
      switch1Left(i);
    }
  }
}

function randomLine() {
  var firstLineFreq = [];
  for (var i = 1; i < 9; ++i) {
    firstLineFreq[i] = 0;
  }

  for (var i = 0; i < 9; ++i) {
    var randomNumber = Math.floor(Math.random() * 9) + 1;
    while (firstLineFreq[randomNumber] === 1) {
      randomNumber = Math.floor(Math.random() * 9) + 1;
    }

    gameMatrix[0][i] = randomNumber;
    firstLineFreq[randomNumber] = 1;
  }

}

function switch1Left(line) {
  for (var i = 0; i < 8; ++i) {
    gameMatrix[line][i] = gameMatrix[line - 1][i + 1];
  }

  gameMatrix[line][8] = gameMatrix[line - 1][0];
}

function switch3Left(line) {
  for (var i = 0; i < 6; ++i) {
    gameMatrix[line][i] = gameMatrix[line - 1][i + 3];
  }

  for (var i = 0; i < 3; ++i) {
    gameMatrix[line][i + 6] = gameMatrix[line - 1][i];
  }
}
