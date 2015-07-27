#!/usr/bin/env node
'use strict';

/**
 * Main module. Evaluates command line arguments and starts the actual program
 */

var program   = require('commander'),
    Speakable = require('speakable'),
    GoogleTTS = require('google-tts');

program
  .version('1.0.0')
  .parse(process.argv);

// Start the app
var stt = new Speakable({ key: 'AIzaSyD-tp0pAAegIAr3hk7BHhaja_PNkQFzsmc' });

stt.on('speechResult', function(recognizedWords) {
  // Received result from Google, look for sage keyword
  console.log('Text:', recognizedWords);
  if (recognizedWords.indexOf('Sage') >= 0) {
    GoogleTTS.play('Looking for me?');
  }
  stt.recordVoice();
});

// Start listening
stt.recordVoice();
