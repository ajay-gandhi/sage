/**
 * Module for telling the time
 */

var http = require('http');

module.exports = (function () {

  function JokeModule () {
    this.priority = 0;
  }

  JokeModule.prototype.handle = function (input, speaker, config, complete) {
    var exclude = ['explicit'];

    var api_path = 'http://api.icndb.com/jokes/random?exclude=[' +
                  exclude.join(',') + ']&firstName=' + config.get('name') +
                  '&lastName=';

    // Get joke
    http.get(api_path, function (res) {

      // Collect data
      var result = '';

      res.on('data', function (chunk) {
        result += chunk;
      });

      res.on('end', function () {
        speaker.play(JSON.parse(result).value.joke, complete);
      });

    }).on('error', function (err) {
      console.log('Error retrieveing joke:', err);
    })
  }

  JokeModule.prototype.match = function (input) {
    return /(joke|laugh)/.test(input);
  }

  return JokeModule;

})();
