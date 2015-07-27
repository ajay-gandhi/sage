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
 * Returns true if config file is populated
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
  if (!config) {
    fs.readJson(path, function (err, obj) {
      if (err) return console.log('Error reading config:', err);

      config = obj;
      console.log(config);
      return config[property];
    });

  } else {
    return config[property];
  }
}

/**
 * Returns a JSON object of all config properties and values
 */
module.exports.get_all = function () {
  if (!config) {
    fs.readJson(path, function (err, obj) {
      if (err) return console.log('Error reading config:', err);

      config = obj;
      return config;
    });

  } else {
    return config;
  }
}

/**
 * Prompts the user to set all configuration properties. Should be called before
 * attempting to actually run Sage.
 */
module.exports.configure = function () {
  // Array of questions to inquire
  var questions = [
    {
      name:    'name',
      message: 'What should I call you?',
      validate: function (input) {
        return input.length != 0;
      }
    },
    {
      name:    'google_api_key',
      message: 'Enter your Google Speech API key:',
      validate: function (input) {
        return input.length != 0;
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
