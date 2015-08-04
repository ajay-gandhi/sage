/**
 * Module for email
 */

var imap = require('imap-simple');

module.exports = (function () {

  function EmailModule () {
    this.priority = 0;
  }

  EmailModule.prototype.handle = function (input, speaker, config, complete) {

    // Check if email is set up
    if (!config.get('email_has')) {
      console.log('Email not set up.');
      speaker.say('Email not set up.');
      return;
    }

    // Get creds from config
    var config = {
      imap: {
        user:        config.get('email_address'),
        password:    config.get('email_password'),
        host:        config.get('email_host'),
        port:        config.get('email_port'),
        tls:         true,
        authTimeout: 3000
      }
    };

    var cxn;
    imap
      // Connect
      .connect(config)
      // Open inbox
      .then(function (connection) {
        cxn = connection;
        return connection.openBox('INBOX');
      })
      // Search for unread emails
      .then(function () {
        var criteria = ['UNSEEN'];
 
        var options = {
          bodies: ['HEADER'],
          markSeen: false
        };
 
        return cxn.search(criteria, options);
      })
      .then(function (results) {

        // Max of 3 emails
        var count = results.length;
        if (count > 3) {
          count = 'more than 3';
          results = results.slice(0, 3);

        } else if (count == 0) {
          speaker.say('You have no new emails.', complete);
          return;
        }

        var content = 'You have ' + count + ' unread ' +
                      ((count == 1) ? 'email' : 'emails') + '. ';

        for (var i = 0; i < results.length; i++) {
          var part = results[i].parts[0];

          // Collect sender and subject
          content += part.body.subject[0] + '. from ' +
                     part.body.from[0].replace(/( )\<[^>]*\>/, '') + '. ';
        }

        speaker.say(content, complete);

      });

  }

  EmailModule.prototype.match = function (input) {
    return /(mail)/.test(input);
  }

  return EmailModule;

})();
