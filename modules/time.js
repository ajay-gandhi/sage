/**
 * Module for telling the time
 */

module.exports = (function () {

  function TimeModule () {
    this.priority = 0;
  }

  TimeModule.prototype.handle = function (input, speaker, config, complete) {
    var now = new Date();

    if (/time/.test(input)) {
      // Tell the time
      var hour = now.getHours();
      var minute = now.getMinutes();
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

      speaker.play('The time is ' + hour + '. ' + minute + '. ' + ampm, complete);

    } else {
      // Tell the date
      var year = now.getFullYear();

      // See https://gist.github.com/jlbruno/1535691
      var date  = now.getDate();
      var s = ['th','st','nd','rd'],
          v = date % 100;
      today = date + (s[(v - 20) % 10] || s[v] || s[0]);


      var days  = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      var day = days[now.getDay()],
          month = months[now.getMonth()];

      speaker.play('Today is ' + day + ', ' + month + ' ' + today + ', ' + year, complete);

    }
  }

  TimeModule.prototype.match = function (input) {
    return /(date|time|day)/.test(input);
  }

  return TimeModule;

})();
