const FileHandler = require('./fileHandler');
const Utilities = require('./utilities');

function Parser() {
  this.parsePuzzle = function parsePuzzle(puzzleName) {
    let myFileHandler = new FileHandler(),
      myUtilities = new Utilities(),
      puzzleArray = myFileHandler
        .readFile(
          __dirname.substring(
            0,
            __dirname.lastIndexOf('/', __dirname.lastIndexOf('/'))
          ) +
            '/Puzzles/UnparsedPuzzles/' +
            puzzleName
        )
        .split(/(?=<)/g),
      outputArray = [],
      outputString = '';
    for (let index = 0, divLevel = 0; index < puzzleArray.length; index++)
      puzzleArray[index].charAt(1) === 'd'
        ? divLevel++ === 2
          ? outputArray.push(
              myUtilities.isDigit(puzzleArray[index].slice(-1))
                ? puzzleArray[index].slice(-1)
                : 's'
            )
          : () => {}
        : puzzleArray[index].charAt(1) === '/'
        ? divLevel--
        : () => {};
    for (let index = 0; index < outputArray.length; index++)
      outputString += outputArray[index] + (index % 9 === 8 ? '\n' : '');
    myFileHandler.writeFile(
      __dirname.substring(
        0,
        __dirname.lastIndexOf('/', __dirname.lastIndexOf('/'))
      ) +
        '/Puzzles/ParsedPuzzles/' +
        puzzleName,
      outputString
    );
  };
}

module.exports = Parser;
