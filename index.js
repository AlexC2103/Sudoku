var gameMatrix = [];
var selectedCellId = '';

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
      cell.setAttribute('onclick', 'selectCell(this.id)');
    }

    var br = document.createElement('br');
    boardStart.appendChild(br);
  }

  for (var i = 1; i <= 9; ++i) {
    boardStart = document.getElementById('keyboard');
    var keyboardButton = document.createElement('BUTTON');
    var id = 100 + i;

    boardStart.appendChild(keyboardButton);
    keyboardButton.setAttribute('id', id);
    keyboardButton.setAttribute('class', 'keyboardButton');
    keyboardButton.setAttribute('onclick', 'placeNumber(this.id)');

    document.getElementById(id).innerHTML = i;
  }

  for (var i = 2; i < 81; i += 3) {
    document.getElementById(i).classList.add('rightBorder');
  }

  for (var i = 8; i < 81; i += 9) {
    document.getElementById(i).classList.remove('rightBorder');
  }

  for (var i = 18; i < 46; i += 27) {
    for (var j = 0; j < 9; ++j) {
      document.getElementById(i + j).classList.add('bottomBorder');
    }
  }

  randomFirstLine();
  for (var i = 1; i < 9; ++i) {
    if (i !== 3 && i !== 6) {
      switch3Left(i);
    } else {
      switch1Left(i);
    }
  }

  for (var i = 0; i < 47; ++i) {
    var randomLine = Math.floor(Math.random() * 9);
    var randomColumn = Math.floor(Math.random() * 9);
    while (gameMatrix[randomLine][randomColumn] === 0) {
      randomLine = Math.floor(Math.random() * 9);
      randomColumn = Math.floor(Math.random() * 9);
    }

    gameMatrix[randomLine][randomColumn] = 0;
  }

  for (var i = 0; i < 9; ++i) {
    for (var j = 0; j < 9; ++j) {
      if (gameMatrix[i][j] !== 0) {
        document.getElementById(i * 9 + j).innerHTML = gameMatrix[i][j];
        document.getElementById(i * 9 + j).classList.add('initialPuzzleCell');
      }
    }
  }
}

function randomFirstLine() {
  for (var i = 0; i < 9; ++i) {
    gameMatrix[0][i] = i + 1;
  }

  for (var i = 8; i > 0; --i) {
    var j = Math.floor(Math.random() * (i + 1));
    var auxiliar = gameMatrix[0][i];
    gameMatrix[0][i] = gameMatrix[0][j];
    gameMatrix[0][j] = auxiliar;
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

function selectCell(clickedCellId) {
  if (!(document.getElementById(clickedCellId).classList.contains('initialPuzzleCell'))) {
    if (selectedCellId === '') {
      document.getElementById(clickedCellId).classList.add('selectedCell');
      selectedCellId = clickedCellId;
    } else if (selectedCellId === clickedCellId) {
      document.getElementById(clickedCellId).classList.remove('selectedCell');
      selectedCellId = '';
    } else if (selectedCellId !== clickedCellId) {
      document.getElementById(selectedCellId).classList.remove('selectedCell');
      document.getElementById(clickedCellId).classList.add('selectedCell');
      selectedCellId = clickedCellId;
    }
  }
}

function placeNumber(keyboardButtonId) {

  var selectedCell = document.getElementsByClassName('selectedCell');

  var line = parseInt(selectedCell[0].id / 9);
  var column = selectedCell[0].id - line * 9;

  if (selectedCell.length !== 0) {
    selectedCell[0].innerHTML = keyboardButtonId % 10;
    gameMatrix[line][column] = parseInt(selectedCell[0].innerHTML);
  }
}
