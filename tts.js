/**
 * TTS module
 *
 * Wrapper around espeak executable
 */
var spawn = require('child_process').spawn;

/**
 * Converts the given text to speech and says it out loud. After it finishes
 * talking, the callback function is called.
 */
module.exports.say = function (text, callback) {
  var espeak = spawn('espeak', ['-v', 'en-us', text]);

  espeak.on('close', function () {
    if (callback) callback();
  });
}
