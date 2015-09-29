/**
 * Module for WolframAlpha (definitions, etc)
 *
 * The questions posed to this module are pretty generic and can take any
 * form, so the priority is lower than all others and it matches almost any
 * question
 *
 * This module assumes the hotword is spoken before asking the question
 */

var WolframClient = require('node-wolfram');

module.exports = (function () {

  function WolframModule () {
    this.priority = -1;
  }

  WolframModule.prototype.handle = function (input, speaker, config, complete) {
    var api_key = config.get('wolfram_api_key');

    if (api_key.length == 0) {
      console.log('No WolframAlpha API key.');
      speaker.say('No WolframAlpha API key.');
      return;
    }

    var Wolfram = new WolframClient(api_key);

    Wolfram.query(input, function (err, result) {
      if (err) return console.log('Error with API:', err);

      // No results
      if (!result.queryresult.pod) {
        speaker.say('I didn\'t understand your question.', complete);
        return;
      }

      // Get primary answer
      var content;
      for (var p = 0; p < result.queryresult.pod.length; p++) {
        var pod = result.queryresult.pod[p];

        // Only return primary pod
        if (pod.$.primary === 'true') {
          content = pod.subpod[0].plaintext[0];
          break;
        }
      }

      if (content.indexOf('1 | ') == 0) {
        // Definitions have multiple (see WolframAlpha API)
        var idx = 1;
        var defns = content.split(/\n/);

        // Play first few definitions
        var len     = (defns.length > 3) ? 3 : defns.length,
            content = '';

        for (var i = 0; i < len; i++) {
          // Remove id and part of speech
          content += defns[i].replace(/^(.*)\|(.*)\|/, '') + '.';
        }

        speaker.say(content, complete);

      } else {
        // Not a defn, so speak result
        speaker.say(content, complete);
      }
    });

  }

  WolframModule.prototype.match = function (input) {
    var r = /(what|who|when|where|how|why|about|define|calculate)/;
    return r.test(input);
  }

  return WolframModule;

})();
