# Developing

Sage provides an intuitive interface for developing your own modules.

* [Framework](#framework)
* [Matching Input](#matchingInput)
* [Priority](#priority)
* [Handling Input](#handleInput)

## Framework

First, create a JSON object. This object will be exported to Sage:

```js
module.exports = (function () {

  function ModuleName () {
  }

  return ModuleName;

})();
```

By convention, the name of the object describes its function and ends in
`Module`, e.g. `TimeModule`.

## Matching Input

Next, create a prototype method of the object called `match`. This method
chooses whether Sage will choose this module to evaluate the spoken input or
choose a different module.

Sage will pass the converted speech as text as the first parameter to the
method. Return `true` from the method if Sage _should_ choose this module,
otherwise return `false`.

```js
  ModuleName.prototype.match = function (input) {
    if (...) {      // Some criteria for this module
      return true;
    } else {
      return false;
    }
  }
```

## Priority

What if multiple modules return `true` from the `match` method? How does Sage
know which to choose properly?

In order to define an order for the modules, define a property of the object
called `priority`:

```js
  function ModuleName () {
    this.priority = 0; // Add this line
  }
```

The higher the priority, the more precedence given to that module. For example,
if two modules have priorities 10 and 1 respectively, the first will be chosen.

If such a priority does not need to be defined, set the priority to 0.

## Handling Input

Add another prototype method to the object called `handle`. This method will
execute the specified code once the module has been chosen by Sage.

```js
  ModuleName.prototype.handle = function (input, speaker, config, complete) {

  }
```

The method is given four parameters.

* `input`:    The spoken audio converted to text
* `speaker`:  A link to the TTS system so that you can speak your results. See
              [tts.js](../tts.js) for documentation, and any
              [module](../modules/) for an example.
* `config`:   An instance of the config object. Use `config.get(propertyname)`
              to get the value of a property.
* `complete`: The module callback function. Sage stops listening to what you say
              once it recognizes its hotword. You must call this function after
              your code has finished running so that Sage starts listening
              again. Having this callback function ensures that Sage doesn't
              activate itself while telling you some information. Note that the
              tts module has a callback parameter for its `say` function.

Using these three parameters, you can write code that, for example, contacts a
weather API and reads today's forecast.

## API Keys and Other Config

If your module requires an API key, or some sort of persistent setting, you can
add it to the config file by running:

```bash
$ sage --add-config
$ sage -a           # Shortcode alias
```

Sage will then prompt you for the property name and value you want to add.

## Finishing Up

Once you've followed the above steps, just drop the file into the `modules`
directory and restart Sage. The module will be automatically included.

If you think you've made a great module and would like to include it here, add
it to your `modules` directory and submit a pull request!
