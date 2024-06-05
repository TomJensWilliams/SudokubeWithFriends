const fs = require('node:fs');

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

function isDigit(inputCharacter) {
  return (
    inputCharacter === '1' ||
    inputCharacter === '2' ||
    inputCharacter === '3' ||
    inputCharacter === '4' ||
    inputCharacter === '5' ||
    inputCharacter === '6' ||
    inputCharacter === '7' ||
    inputCharacter === '8' ||
    inputCharacter === '9'
  );
}

let myFileHandler = new FileHandler();
let puzzleString = myFileHandler.readFile(
  __dirname + '/Puzzles/UnparsedResources/puzzle1.txt'
);
let arrayedPuzzleString = puzzleString.split(/(?=<)/g);
let divLevel = 0;
let outputArray = [];
for (let index = 0; index < arrayedPuzzleString.length; index++) {
  if (arrayedPuzzleString[index].charAt(1) === 'd') {
    if (divLevel === 2 && isDigit(arrayedPuzzleString[index].slice(-1))) {
      outputArray.push(arrayedPuzzleString[index].slice(-1));
    } else if (divLevel === 2) {
      outputArray.push('s');
    }
    divLevel++;
  } else if (arrayedPuzzleString[index].charAt(1) === '/') {
    divLevel--;
  } else {
    console.log('THIS IS A PROBLEM');
  }
}

let outputString = '';
for (let index = 0; index < outputArray.length; index++) {
  outputString += outputArray[index];
  if (index % 9 === 8) {
    outputString += '\n';
  }
}

console.log(outputString);
