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
      var cellId = i * 9 + j;
      createCell(cellId, boardStart);
    }

    var br = document.createElement('br');
    boardStart.appendChild(br);
  }

  for (var i = 1; i <= 10; ++i) {
    boardStart = document.getElementById('keyboard');
    var keyboardButton = document.createElement('BUTTON');
    var id = 100 + i;

    boardStart.appendChild(keyboardButton);
    keyboardButton.setAttribute('id', id);
    keyboardButton.setAttribute('class', 'keyboardButton');
    if (i <= 9) {
      keyboardButton.setAttribute('onclick', 'placeNumber(this.id)');

      document.getElementById(id).innerHTML = i;
    }

    if (i === 10) {
      keyboardButton.setAttribute('onclick', 'eraseNumber(this.id)');
      document.getElementById(id).innerHTML = '<i class="fas fa-eraser"></i>';
    }
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

function createCell(cellId, boardStart) {
  var cell = document.createElement('BUTTON');
  boardStart.appendChild(cell);
  cell.setAttribute('class', 'puzzleCell');
  cell.setAttribute('id', cellId);
  cell.setAttribute('onclick', 'selectCell(this.id)');
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

  notInLine(gameMatrix, line, column);
  notInColumn(gameMatrix, line, column);
  notInBox(gameMatrix, line, column, line - line % 3, column - column % 3);
}

function eraseNumber(keyboardButtonId) {
  var selectedCell = document.getElementsByClassName('selectedCell');

  var line = parseInt(selectedCell[0].id / 9);
  var column = selectedCell[0].id - line * 9;

  if (selectedCell.length !== 0) {
    selectedCell[0].innerHTML = '';
    gameMatrix[line][column] = 0;
  }

  notInLine(gameMatrix, line, column);
  notInColumn(gameMatrix, line, column);
  notInBox(gameMatrix, line, column, line - line % 3, column - column % 3);
}

function notInLine(gameMatrix, line, column) {
  var st = new Set();
  if (gameMatrix[line][column] !== 0) {
    st.add(gameMatrix[line][column]);
  }

  for (var i = 0; i < 9; ++i) {
    if (i !== column) {
      if (st.has(gameMatrix[line][i])) {
        document.getElementById(line * 9 + i).style.color = 'red';
        return false;
      }
    }

    if (gameMatrix[line][i] !== 0) {
      st.add(gameMatrix[line][i]);
    }
  }

  for (var i = 0; i < 9; ++i) {
    document.getElementById(line * 9 + i).style.color = 'black';
  }

  return true;
}

function notInColumn(gameMatrix, line, column) {
  var st = new Set();
  if (gameMatrix[line][column] !== 0) {
    st.add(gameMatrix[line][column]);
  }

  for (var i = 0; i < 9; ++i) {
    if (i !== line) {
      if (st.has(gameMatrix[i][column])) {
        document.getElementById(i * 9 + column).style.color = 'red';
        return false;
      }
    }

    if (gameMatrix[i][column] !== 0) {
      st.add(gameMatrix[i][column]);
    }
  }

  for (var i = 0; i < 9; ++i) {
    document.getElementById(i * 9 + column).style.color = 'black';
  }

  return true;
}

function notInBox(gameMatrix, line, column, startLine, startColumn) {
  var st = new Set();
  if (gameMatrix[line][column] !== 0) {
    st.add(gameMatrix[line][column]);
  }

  for (var i = 0; i < 3; ++i) {
    for (var j = 0; j < 3; ++j) {
      var currentElement = gameMatrix[i + startLine][j + startColumn];
      if (i !== line || j !== column) {
        if (st.has(currentElement)) {
          document.getElementById((i + startLine) * 9 + (j + startColumn)).style.color = 'red';
          return false;
        }
      }

      if (currentElement !== 0) {
        st.add(currentElement);
      }
    }
  }

  for (var line = 0; line < 3; ++line) {
    for (var column = 0; column < 3; ++column) {
      document.getElementById((line + startLine) * 9 + (column + startColumn)).style.color = 'black';
    }
  }

  return true;
}
