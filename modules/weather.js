/**
 * Module for weather
 */

var weather = require('weather-js');

module.exports = (function () {

  function WeatherModule () {
    this.priority = 0;
  }

  WeatherModule.prototype.handle = function (input, speaker, config) {
    var zipcode = config.get('weather');

    weather.find({ search: zipcode, degreeType: 'F' }, function(err, result) {
      if (err) console.log(err);

      var days  = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var today = days[(new Date()).getDay()];

      var forecast;
      for (var i = 0; i < result[0].forecast.length; i++) {
        if (result[0].forecast[i].day === today)
          forecast = result[0].forecast[i];
      }

      var current_temp = result[0].current.temperature;
      var high         = forecast.high;
      var low          = forecast.low;
      var conditions   = forecast.skytextday;

      speaker.play('It is currently ' + current_temp + '. Today will be ' +
        conditions + ' with a high of ' + high + ' and a low of ' + low);
    });
  }

  WeatherModule.prototype.match = function (input) {
    return /(weather|temperature|forecast|jacket|coat|rain|snow)/.test(input);
  }

  return WeatherModule;

})();
