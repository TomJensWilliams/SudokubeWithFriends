const Parser = require('./parser');
const Solver = require('./solver');

let puzzleName = process.argv[2];
let myParser = new Parser();
let mySolver = new Solver();

myParser.parsePuzzle(puzzleName);
mySolver.attemptPuzzle(puzzleName);
