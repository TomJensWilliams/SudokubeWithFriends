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

module.exports = FileHandler;
