const Utilities = require('./utilities');

function Cell(
  rowInput,
  columnInput,
  blockInput,
  valueInput,
  presetInput,
  postsetInput
) {
  let myUtilities = new Utilities();
  this.row = rowInput;
  this.column = columnInput;
  this.block = blockInput;
  this.value = myUtilities.isDigit(valueInput) ? valueInput : undefined;
  this.preset = presetInput === true ? true : false;
  this.postset = postsetInput === true ? true : false;
  this.possibilities = new Array(10);
  this.possibilities.fill(myUtilities.isDigit(valueInput) ? false : true);
  // REMOVE? isDigit(valueInput) ? (this.possibilities[valueInput] = true) : () => {};
  this.notes = new Array(10).fill(false);

  this.setValue = function (valueInput) {
    this.value = valueInput;
    this.postset = true;
    this.possibilities.fill(false);
    this.possibilities[this.value] = true;
  };

  this.setPossibility = function (valueInput) {
    this.postset ? () => {} : (this.possibilities[valueInput] = false);
  };

  this.getPossibilities = function () {
    let output = [];
    for (let index = 1; index <= 9; index++) {
      this.possibilities[index] ? output.push(index) : () => {};
    }
    return output;
  };
}

module.exports = Cell;
