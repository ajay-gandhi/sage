#!/usr/bin/env node
'use strict';

/**
 * Main module. Evaluates command line arguments and starts the actual program
 */

var program   = require('commander'),
    Speakable = require('speakable'),
    GoogleTTS = require('google-tts'),
    fs        = require('fs'),
    Lame      = require('lame'),
    Speaker   = require('speaker');

program
  .version('1.0.0')
  .parse(process.argv);

// Start the app
var stt = new Speakable({ key: 'AIzaSyD-tp0pAAegIAr3hk7BHhaja_PNkQFzsmc' });

stt.on('speechResult', function(recognizedWords) {
  // Received result from Google, look for sage keyword
  if (recognizedWords.indexOf('Sage') >= 0) {
    GoogleTTS.convert('Looking for me?', __dirname + '/temp', function () {
      fs.createReadStream(__dirname + '/temp.mp3')
        .pipe(new Lame.Decoder())
        .on('format', function (format) {
          this.pipe(new Speaker(format));
        });
    });
  }
  stt.recordVoice();
});

// Start listening
stt.recordVoice();
