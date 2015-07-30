#!/usr/bin/env node

/**
 * Main module. Evaluates command line arguments and starts the actual program
 */

// NPM modules
var program   = require('commander'),
    Speakable = require('speakable'),
    fs        = require('fs-extra'),
    chalk     = require('chalk'),
    inquirer  = require('inquirer');

// Local modules
var config = require('./config'),
    tts    = require('./tts'),
    util   = require('./util');

program
  .version(require('./package.json').version)
  .option('-c, --configure',  'configure Sage')
  .option('-a, --add-config', 'add a specific config property')
  .option('-t, --text',       'run Sage with text I/O')
  .option('-r, --run',        'run Sage (alias: no flags)')
  .parse(process.argv);

if (program.configure) {
  // Ask for configuration options and write to config file
  config.configure();

} else if (program.addConfig) {
  // Add a specific config property
  config.add();

} else if (program.text) {
  // Text I/O
  // Input from the user comes from the console instead of the mic
  // Output from Sage goes through the console instead of speakers

  // Check if config exists, then start the app
  if (!config.exists()) {
    console.log('Error: You must configure Sage before you can run it.\n' +
      'Do this by running app.js with the `--configure` flag:\n\n' +
      '    $ ./app.js --configure\n');
    process.exit(0);
  }

  // Print ASCII art
  util.intro();

  var modules = util.get_modules();

  var hotword = config.get('hotword');

  var query = function () {
    var question = [{
      name:    'input',
      message: 'You:'
    }];

    inquirer.prompt(question, function (answers) {

      var recognized_text = answers.input;
      if (recognized_text.indexOf(hotword) >= 0) {

        // Search modules
        for (var i = 0; i < modules.length; i++) {
          var module = modules[i];

          if (module.match(recognized_text)) {

            console.log('Chose', /(\w+)\(/.exec(module.constructor.toString())[1]);

            // Handle the input with this module
            module.handle(recognized_text, util.tts_sim, config, function () {
              query();
            });
            break;
          }
        }

      } else {
        // Start listening again
        console.log('(No action)');
        query();
      }
    });
  }

  query();

} else {
  // Check if config exists, then start the app
  if (!config.exists()) {
    console.log('Error: You must configure Sage before you can run it.\n' +
      'Do this by running app.js with the `--configure` flag:\n\n' +
      '    $ ./app.js --configure\n');
    process.exit(0);
  }

  // Print ASCII art
  util.intro();

  // Initialize variables
  var stt = new Speakable(
    { key: config.get('google_api_key') },
    { sox_path: 'sox' }
  );

  var modules = util.get_modules();

  var hotword = config.get('hotword');

  // Everything is now ready
  stt.on('speechResult', function(recognized_words) {
    var recognized_text = recognized_words.join(' ').toLowerCase();

    // Received result from Google, look for sage keyword
    console.log('Text:', recognized_words);
    if (recognized_text.indexOf(hotword) >= 0) {

      // Search modules
      for (var i = 0; i < modules.length; i++) {
        var module = modules[i];

        if (module.match(recognized_text)) {

          console.log('Chose', /(\w+)\(/.exec(module.constructor.toString())[1]);

          // Handle the input with this module
          module.handle(recognized_text, tts, config, function () {
            console.log();
            stt.recordVoice();
          });
          break;
        }
      }

    } else {
      // Start recording again
      console.log();
      stt.recordVoice();
    }
  });

  // Start listening
  console.log(chalk.green('Listening!\n'));
  stt.recordVoice();
}
