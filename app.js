#!/usr/bin/env node
'use strict';

/**
 * Main module. Evaluates command line arguments and starts the actual program
 */

// NPM modules
var program   = require('commander'),
    Speakable = require('speakable'),
    GoogleTTS = require('google-tts'),
    fs        = require('fs-extra');

// Local modules
var config = require('./config');

program
  .version(require('./package.json').version)
  .option('-c, --configure', 'Configure Sage')
  .option('-C, --add-config', 'Add a specific config property')
  .parse(process.argv);

if (program.configure) {
  // Ask for configuration options and write to config file
  config.configure();

} else if (program.addConfig) {
  // Add a specific config property

} else {
  // Check if config exists, then start the app
  if (!config.exists()) {
    console.log('Error: You must configure Sage before you can run it.\n' +
      'Do this by running app.js with the `--configure` flag:\n\n' +
      '    $ ./app.js --configure\n');
    process.exit(0);
  }

  // Initialize variables
  var stt = new Speakable(
    { key: config.get('google_api_key') },
    { sox_path: 'sox' }
  );

  // Gather all the modules
  var modules = [];
  fs.readdir(__dirname + '/modules', function (err, files) {
    // Each of files is a module
    // Add it to modules array
    files.forEach(function (filename) {
      modules.push(new (require('./modules/' + filename))());
    });

    // Sort modules by decreasing priority
    modules.sort(function (a, b) {
      return a.priority - b.priority;
    });
  });

  // Everything is now ready
  stt.on('speechResult', function(recognized_words) {
    var recognized_text = recognized_words.join(' ');

    // Received result from Google, look for sage keyword
    console.log('Text:', recognized_words);
    if (recognized_words.indexOf('Sage') >= 0) {

      console.log('Searching modules');

      modules.forEach(function (module) {
        if (module.match(recognized_text)) {
          module.handle(recognized_text, GoogleTTS);
          return;
        }
      });
    }

    console.log();
    stt.recordVoice();
  });

  // Start listening
  console.log('Listening');
  stt.recordVoice();
}