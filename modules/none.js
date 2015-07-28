/**
 * Module if none match
 */

module.exports = (function () {

  function NoneModule () {
    this.priority = Number.MIN_VALUE;
  }

  NoneModule.prototype.handle = function (input, speaker, config) {
    messages = [
      'Pardon?',
      "I didn't get that.",
      'Sorry?'
    ];

    // Say random message
    speaker.play(messages[Math.floor(Math.random() * messages.length)]);
  }

  NoneModule.prototype.match = function (input) {
    // Always true because priority is smallest
    return true;
  }

  return NoneModule;

})();
