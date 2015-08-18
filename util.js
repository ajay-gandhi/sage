/**
 * General utility functions, put here for cleanliness
 */

var chalk = require('chalk'),
    fs    = require('fs-extra');

/**
 * Clears the screen, prints the Sage ASCII intro
 */
module.exports.intro = function () {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  console.log(chalk.yellow('\n' +
    '               Sage                         \n' +
    '   __                                       \n' +
    '  (  _ _ _     A talking personal assistant \n' +
    ' __)(/(/(-                                  \n' +
    '     _/        Written by Ajay Gandhi       \n' +
    '                                            \n'));
}

/**
 * Retrieves and initializes all modules
 */
module.exports.get_modules = function () {
  // Gather all the modules
  var modules = [];
  var filenames = fs.readdirSync(__dirname + '/modules');

  // Each file is a module
  // Add each to modules array
  filenames.forEach(function (filename) {
    // Ignore modules if it errors
    try {
      modules.push(new (require('./modules/' + filename))());
    } catch (e) {
      console.log(chalk.red('Ignoring module: ' + filename + ' due to errors'));
    }
  });

  // Sort modules by decreasing priority
  modules.sort(function (a, b) {
    return b.priority - a.priority;
  });

  return modules;
}

/**
 * Simulated TTS object that outputs to console instead of speakers
 */
var say_sim = function (text, callback) {
  console.log(chalk.bold.green('>' + ' Sage:'), text);
  if (callback) callback();
}

module.exports.tts_sim = {
  say: say_sim
}
