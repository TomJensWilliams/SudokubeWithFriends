function Utilities() {
  this.isDigit = function isDigit(inputCharacter) {
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(
      inputCharacter
    );
  };
  this.primesArray = function primesArray() {
    return [0, 1, 2, 3, 5, 7, 11, 13, 17, 19];
  };
}

module.exports = Utilities;
