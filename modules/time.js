/**
 * Module for telling the time
 */

module.exports = (function () {

  function Module () {
    this.priority = 0;
    this.keywords = ['time'];
  }

  Module.prototype.handle = function (text, speaker) {
    // Create string of time
    var currentdate = new Date();
    var hour = currentdate.getHours();
    var minute = currentdate.getMinutes();
    var ampm = 'AM';

    // Format hour
    if (hour >= 12) {
      ampm = 'PM';
      hour -= 12;
    }

    if (hour == 0) hour = 12;

    // Minute has to be formatted so that TTS says it properly
    if (minute == 0) {
      minute = 'o clock';
    } else if (minute < 10) {
      minute = 'o ' + minute;
    }

    speaker.play('The time is ' + hour + ', ' + minute + ', ' + ampm);
  }

  Module.prototype.match = function (text) {
    return true;
  }

  return Module;

})();
