/**
 * Interface for interacting with the configuration - setting, getting, etc
 */

// NPM modules
var inquirer = require('inquirer'),
    fs       = require('fs-extra');

// Local cache of config
var config;

// Path to config file
var path = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']
    + '/.sage.json';

/**
 * Returns true if config file exists and is populated
 */
module.exports.exists = function () {
  if (!config) {
    // Attempt to read config file
    try {
      config = fs.readJsonSync(path);
    } catch (err) {
      return false;
    }

    // No errors, file exists
    return true;

  } else {
    return true;
  }
}

/**
 * Gets the config value for the given property
 */
module.exports.get = function (property) {
  return config[property];
}

/**
 * Returns a JSON object of all config properties and values
 */
module.exports.get_all = function () {
  return config;
}

/**
 * Prompts the user and adds a specific config property
 */
module.exports.add = function () {
  var questions = [
    {
      name:     'prop',
      message:  'What is the name of the property you want to add?',
      validate: function (input) {
        // Alphanumeric and _ only
        if (!input.match(/^[a-zA-Z0-9_]+$/) && input.length != 0)
          return 'Can only contain letters, numbers, and underscore (_)';
        else
          return true;
      }
    },
    {
      name:    'value',
      message: 'Value:' 
    }
  ];

  inquirer.prompt(questions, function (answers) {
    // Validation occurs during prompt, so we can write the resulting JSON now
    // Read
    fs.readJson(path, function (err, obj) {
      if (err) return console.log('Error reading config:', err);

      // Add
      obj[answers.prop] = answers.value;

      // Write
      fs.writeJson(path, obj, function (err) {
        if (err) return console.log('Error writing config:', err);

        config = obj;
        console.log('Success! The property has been added.');
      });
    });
  });
}

/**
 * Prompts the user to set all configuration properties. Should be called before
 * attempting to actually run Sage.
 */
module.exports.configure = function () {
  // Array of questions to inquire
  var questions = [
    {
      name:    'hotword',
      message: 'What should Sage listen for to activate (hotword)?',
      default: 'sage',
      validate: function (input) {
        // Alpha only, empty is okay (default exists)
        if (!input.match(/^[a-zA-Z]+$/) && input.length != 0)
          return 'Letters only';
        else
          return true;
      },
      filter:   function (input) {
        return input.toLowerCase();
      }
    },
    {
      name:    'name',
      message: 'What should I call you?',
      validate: function (input) {
        if (input.length == 0) return 'Cannot be empty';
        else                   return true;
      }
    },
    {
      name:    'google_api_key',
      message: 'Enter your Google Speech API key:',
      validate: function (input) {
        if (input.length == 0) return 'Cannot be empty';
        else                   return true;
      }
    }
  ];

  inquirer.prompt(questions, function (answers) {

    // Validation occurs during prompt, so we can write the resulting JSON now
    fs.writeJson(path, answers, function (err) {
      if (err) return console.log('Error writing config:', err);

      config = answers;
      console.log('Success! You are ready to use Sage.');
    });
  });
}
