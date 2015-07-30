/**
 * Module if none match
 */

module.exports = (function () {

  function NoneModule () {
    this.priority = Number.NEGATIVE_INFINITY;
  }

  NoneModule.prototype.handle = function (input, speaker, config, complete) {
    msg = [
      'Pardon?',
      "I didn't get that.",
      'Sorry?'
    ];

    // Say random message
    speaker.say(msg[Math.floor(Math.random() * msg.length)], complete);
  }

  NoneModule.prototype.match = function (input) {
    // Always true because priority is smallest
    return true;
  }

  return NoneModule;

})();
