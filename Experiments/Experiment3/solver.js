const fs = require('node:fs');

function Puzzle(valuesInput) {
  //
  this.primesArray = [0, 1, 2, 3, 5, 7, 11, 13, 17, 19];
  this.rows = new Array(9);
  this.columns = new Array(9);
  this.boxes = new Array(9);
  for (let index = 0; index < 9; index++) {
    this.rows[index] = new Array(9);
    this.columns[index] = new Array(9);
    this.boxes[index] = new Array(9);
  }
  //
  let valuesString = valuesInput.split('\n').join('');
  for (let index = 0; index < 81; index++) {
    let currentValue = acceptableInput(valuesString.charAt(index))
      ? valuesString.charAt(index)
      : undefined;
    let quotient = Math.floor(index / 9);
    let remainder = index % 9;
    let outerBoxIndex =
      3 * Math.floor(quotient / 3) + 1 * Math.floor(remainder / 3);
    let innerBoxIndex = 3 * (quotient % 3) + (remainder % 3);
    let currentSquare = new Square(
      quotient,
      remainder,
      outerBoxIndex,
      currentValue,
      currentValue !== undefined,
      currentValue !== undefined
    );
    this.rows[quotient][remainder] = currentSquare;
    this.columns[remainder][quotient] = currentSquare;
    this.boxes[outerBoxIndex][innerBoxIndex] = currentSquare;
  }

  // LEFT OFF HERE <===================================================================================================================================================

  this.printPuzzle = function () {
    let dividingLine = '+---+---+---+\n';
    let output = '' + dividingLine;
    for (let outerIndex = 0; outerIndex < 9; outerIndex++) {
      output += '|';
      for (let innerIndex = 0; innerIndex < 9; innerIndex++) {
        // output += '(' + outerIndex + ',' + innerIndex + ')';
        output +=
          this.rows[outerIndex][innerIndex].value !== undefined
            ? this.rows[outerIndex][innerIndex].value
            : ' ';
        if (innerIndex % 3 === 2) {
          output += '|';
        }
      }
      output += '\n';
      if (outerIndex % 3 === 2) {
        output += dividingLine;
      }
    }
    console.log(output);
  };

  // SOLUTION SECTION /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let changed = true;
  while (changed) {
    changed = false;
    for (let outerIndex = 0; outerIndex < 9; outerIndex++) {
      for (let innerIndex = 0; innerIndex < 9; innerIndex++) {
        let currentSquare = this.rows[outerIndex][innerIndex];
        if (!currentSquare.used && acceptableInput(currentSquare.value)) {
          currentSquare.used = true;
          let currentValue = currentSquare.value;
          let currentRow = currentSquare.row;
          let currentColumn = currentSquare.column;
          let currentBox = currentSquare.box;
          for (let markingIndex = 0; markingIndex < 9; markingIndex++) {
            this.rows[currentRow][markingIndex].possibilities[
              currentValue
            ] = false;
            this.columns[currentColumn][markingIndex].possibilities[
              currentValue
            ] = false;
            this.boxes[currentBox][markingIndex].possibilities[
              currentValue
            ] = false;
          }
        }
      }
    }
    //
    for (let outerIndex = 0; outerIndex < 9; outerIndex++) {
      for (let innerIndex = 0; innerIndex < 9; innerIndex++) {
        let currentSquare = this.rows[outerIndex][innerIndex];
        if (!acceptableInput(currentSquare.value)) {
          let possibilitiesCount = 0,
            lastPossibility;
          for (
            let possibilitiesIndex = 1;
            possibilitiesIndex < 10;
            possibilitiesIndex++
          ) {
            if (currentSquare.possibilities[possibilitiesIndex]) {
              possibilitiesCount++;
              lastPossibility = '' + possibilitiesIndex;
            }
          }
          if (possibilitiesCount === 1) {
            currentSquare.value = lastPossibility;
            changed = true;
          }
        }
      }
    }
    //
    for (let outerIndex = 0; outerIndex < 9; outerIndex++) {
      console.log('HERE');
      let rowsPossibilities = new Array(10);
      let columnsPossibilities = new Array(10);
      let boxesPossibilities = new Array(10);
      for (let creationIndex = 1; creationIndex <= 9; creationIndex++) {
        rowsPossibilities[creationIndex] = new Array();
        columnsPossibilities[creationIndex] = new Array();
        boxesPossibilities[creationIndex] = new Array();
      }
      for (let innerIndex = 0; innerIndex < 9; innerIndex++) {
        console.log('THERE');
        let currentRowSquare = this.rows[outerIndex][innerIndex];
        let currentColumnSquare = this.columns[outerIndex][innerIndex];
        let currentBoxSquare = this.boxes[outerIndex][innerIndex];
        for (let checkingIndex = 1; checkingIndex <= 9; checkingIndex++) {
          if (
            !acceptableInput(currentBoxSquare.value) &&
            currentRowSquare.possibilities[checkingIndex]
          ) {
            rowsPossibilities[checkingIndex].push(currentRowSquare);
          }
          if (
            !acceptableInput(currentColumnSquare.value) &&
            currentColumnSquare.possibilities[checkingIndex]
          ) {
            columnsPossibilities[checkingIndex].push(currentColumnSquare);
          }
          if (
            !acceptableInput(currentBoxSquare.value) &&
            currentBoxSquare.possibilities[checkingIndex]
          ) {
            boxesPossibilities[checkingIndex].push(currentBoxSquare);
          }
        }
      }
      for (let settingIndex = 1; settingIndex <= 9; settingIndex++) {
        if (rowsPossibilities[settingIndex].length === 1) {
          rowsPossibilities[settingIndex][0].value = settingIndex;
          changed = true;
          console.log(
            `R(${rowsPossibilities[settingIndex][0].row}, ${rowsPossibilities[settingIndex][0].column}, ${rowsPossibilities[settingIndex][0].box}): ${settingIndex}`
          );
        }
        if (columnsPossibilities[settingIndex].length === 1) {
          columnsPossibilities[settingIndex][0].value = settingIndex;
          changed = true;
          console.log(
            `C(${columnsPossibilities[settingIndex][0].row}, ${columnsPossibilities[settingIndex][0].column}, ${columnsPossibilities[settingIndex][0].box}): ${settingIndex}`
          );
        }
        if (boxesPossibilities[settingIndex].length === 1) {
          boxesPossibilities[settingIndex][0].value = settingIndex;
          changed = true;
          console.log(
            `B(${boxesPossibilities[settingIndex][0].row}, ${boxesPossibilities[settingIndex][0].column}, ${boxesPossibilities[settingIndex][0].box}): ${settingIndex}`
          );
        }
      }
    }
    //
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  this.answerString = function () {
    let output = '';
    for (let outerIndex = 0; outerIndex < 9; outerIndex++) {
      for (let innerIndex = 0; innerIndex < 9; innerIndex++) {
        let currentValue = this.rows[outerIndex][innerIndex].value;
        output += acceptableInput(currentValue) ? currentValue : ' ';
      }
      output += '\n';
    }
    return output;
  };

  function acceptableInput(characterInput) {
    if (
      characterInput === '1' ||
      characterInput === '2' ||
      characterInput === '3' ||
      characterInput === '4' ||
      characterInput === '5' ||
      characterInput === '6' ||
      characterInput === '7' ||
      characterInput === '8' ||
      characterInput === '9'
    ) {
      return true;
    }
    return false;
  }
}

function Square(
  rowInput,
  columnInput,
  boxInput,
  valueInput,
  presetInput,
  setInput
) {
  // Visible:
  this.value = valueInput === undefined ? undefined : valueInput;
  this.preset = presetInput === undefined ? false : presetInput;
  this.set = setInput === undefined ? false : setInput;
  this.notes = [
    null,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  // Not Visible:
  this.row = rowInput;
  this.column = columnInput;
  this.box = boxInput;
  this.possibilities = new Array(10);
  valueInput === undefined
    ? this.possibilities.fill(true)
    : this.possibilities.fill(false);
  valueInput == undefined ? () => {} : (this.possibilities[valueInput] = true);
  this.used = false;
}

function FileHandler() {
  this.readFile = function (fileNameInput) {
    let output = '';
    try {
      output = fs.readFileSync(fileNameInput, 'utf8');
    } catch (err) {
      console.error(err);
    }
    return output;
  };

  this.writeFile = function (fileNameInput, stringInput) {
    try {
      fs.writeFileSync(fileNameInput, stringInput);
    } catch (err) {
      console.error(err);
    }
  };
}

// Working Area: //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let myFileHandler = new FileHandler();
let fileNameEnding = 'puzzleC.txt';
let puzzleString = myFileHandler.readFile(
  __dirname + '/Puzzles/' + fileNameEnding
);
let myPuzzle = new Puzzle(puzzleString);
myFileHandler.writeFile(
  __dirname + '/Solutions/' + fileNameEnding,
  myPuzzle.answerString()
);
