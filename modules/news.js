/**
 * Module for reading headlines
 */

var cnn = require('cnn-news');

module.exports = (function () {

  function NewsModule () {
    this.priority = 0;
  }

  NewsModule.prototype.handle = function (input, speaker, config, complete) {
    cnn.top(function (error, meta, articles) {
      if (error) {
        speaker.say('I\'m sorry, I couldn\'t get any headlines.', complete);
        return;
      }

      // Only want max of 3 headlines
      var content = '';
      var count = (articles.length > 3) ? 3 : articles.length;

      for (var i = 0; i < count; i++)
        // First sentence of description (up to HTML tag)
        content += articles[i].description.match(/^(.*?)(?=<)/)[0] + ' ';

      speaker.say(content, complete);
    });
  }

  NewsModule.prototype.match = function (input) {
    return /(news|headline|current|event)/.test(input);
  }

  return NewsModule;

})();
