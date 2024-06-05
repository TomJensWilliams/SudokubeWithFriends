const FileHandler = require('./fileHandler');
const Puzzle = require('./puzzle');

function Solver() {
  this.attemptPuzzle = function attemptPuzzle(puzzleName) {
    let myFileHandler = new FileHandler(),
      puzzleString = myFileHandler.readFile(
        __dirname.substring(
          0,
          __dirname.lastIndexOf('/', __dirname.lastIndexOf('/'))
        ) +
          '/Puzzles/ParsedPuzzles/' +
          puzzleName
      ),
      outputString = '',
      myPuzzle = new Puzzle(puzzleString);
    myPuzzle.attemptSolve();
    outputString = myPuzzle.provideString();
    myFileHandler.writeFile(
      __dirname.substring(
        0,
        __dirname.lastIndexOf('/', __dirname.lastIndexOf('/'))
      ) +
        '/Puzzles/AttemptedPuzzles/' +
        puzzleName,
      outputString
    );
  };
}

module.exports = Solver;
