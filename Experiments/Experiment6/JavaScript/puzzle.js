const Cell = require('./cell');
const Utilities = require('./utilities');

function Puzzle(valuesInput) {
  this.rows = new Array(9);
  this.columns = new Array(9);
  this.blocks = new Array(9);
  for (let index = 0; index < 9; index++) {
    this.rows[index] = new Array(9);
    this.columns[index] = new Array(9);
    this.blocks[index] = new Array(9);
  }
  let valuesArray = valuesInput.replace(/[\n]/g, '').split('');
  for (let index = 0; index < 81; index++) {
    let myUtilities = new Utilities();
    let currentValue = myUtilities.isDigit(valuesArray[index])
      ? valuesArray[index]
      : undefined;
    let quotient = Math.floor(index / 9),
      remainder = index % 9,
      outerBlockIndex =
        3 * Math.floor(quotient / 3) + 1 * Math.floor(remainder / 3),
      innerBlockIndex = 3 * (quotient % 3) + (remainder % 3),
      currentCell = new Cell(
        quotient,
        remainder,
        outerBlockIndex,
        currentValue,
        currentValue !== undefined,
        currentValue !== undefined
      );
    this.rows[quotient][remainder] = currentCell;
    this.columns[remainder][quotient] = currentCell;
    this.blocks[outerBlockIndex][innerBlockIndex] = currentCell;
  }

  this.provideString = function () {
    let output = '';
    for (let index = 0; index < 81; index++) {
      let currentValue = this.rows[(index - (index % 9)) / 9][index % 9].value;
      output += currentValue !== undefined ? currentValue : 's';
      if (index % 9 === 8) {
        output += '\n';
      }
    }
    return output;
  };

  this.applyPossibilities = function (cellInput) {
    if (cellInput.postset === true) return false;
    let output = false;
    let cellPossibilities = cellInput.getPossibilities();
    if (cellPossibilities.length === 1) {
      cellInput.setValue(cellPossibilities[0]);
      output = true;
    }
    return output;
  };

  this.applyUniquePossibilities = function (arrayInput) {
    let output = false;
    let foundValues = new Array(10).fill(false);
    let valuesArray = new Array(10);
    for (let index = 1; index <= 9; index++) {
      valuesArray[index] = new Array();
    }
    for (let outerIndex = 0; outerIndex < 9; outerIndex++) {
      if (arrayInput[outerIndex].postset) {
        foundValues[arrayInput[outerIndex].value] = true;
      } else {
        for (let innerIndex = 1; innerIndex <= 9; innerIndex++) {
          if (arrayInput[outerIndex].possibilities[innerIndex]) {
            valuesArray[innerIndex].push(arrayInput[outerIndex]);
          }
        }
      }
    }
    for (let index = 1; index <= 9; index++) {
      if (!foundValues[index] && valuesArray[index].length === 1) {
        valuesArray[index][0].setValue(index);
        output = true;
      }
    }
    return output;
  };

  this.basicRemovePossibilities = function (cellInput) {
    if (cellInput.postset !== true) return;
    for (let index = 0; index < 9; index++) {
      this.rows[cellInput.row][index].setPossibility(cellInput.value);
      this.columns[cellInput.column][index].setPossibility(cellInput.value);
      this.blocks[cellInput.block][index].setPossibility(cellInput.value);
    }
  };

  this.attemptSolve = function () {
    let keepGoing = true;
    while (keepGoing) {
      keepGoing = false;
      for (let index = 0; index < 81; index++) {
        this.basicRemovePossibilities(
          this.rows[(index - (index % 9)) / 9][index % 9]
        );
      }
      for (let index = 0; index < 9; index++) {
        keepGoing =
          this.applyUniquePossibilities(this.rows[index]) || keepGoing;
        keepGoing =
          this.applyUniquePossibilities(this.columns[index]) || keepGoing;
        keepGoing =
          this.applyUniquePossibilities(this.blocks[index]) || keepGoing;
      }
      for (let index = 0; index < 81; index++) {
        keepGoing =
          this.applyPossibilities(
            this.rows[(index - (index % 9)) / 9][index % 9]
          ) || keepGoing;
      }
    }
  };
}

module.exports = Puzzle;
