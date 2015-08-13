# Installation

Sage runs on [Node.js](http://nodejs.org), so you must have that installed,
along with [npm](http://npmjs.org).

__Note:__ These instructions are relevant as of July 28, 2015.

## Google APIs

Sage uses Google APIs for speech-to-text conversion. This requires an API key.

To obtain an API key for the Google Speech API, follow these steps:

1. Join the [Chromium Dev Group](https://groups.google.com/a/chromium.org/forum/#!forum/chromium-dev)
   on Google Groups. This unhides the Speech API in the developer console.
2. Go to the [Google Developers Console](https://console.developers.google.com)
   and create a project.
3. In the sidebar on the left, click on "APIs & auth", then click on "APIs".
4. Search for "Speech", and click on Speech API. Click on "Enable".
5. Now you have access to the Speech API. To get your API key, click on
   "Credentials" under "APIs & auth".
6. Create a public key.

Keep your API key handy for configuration.

## Node.js Dependencies

Clone this Git repo and navigate to it:

```bash
$ git clone https://github.com/ajay-gandhi/sage.git
$ cd sage/
```

Install any Node.js dependencies using `npm`:

```bash
$ npm install
```

The `speakable` module uses [SoX](http://sox.sourceforge.net) to record audio
(for speech to text conversion), so install `sox`:

```bash
$ sudo apt-get install sox # linux
$ brew install sox         # mac
```

The text-to-speech module uses the `espeak` executable, so install that as well:

```bash
$ sudo apt-get install espeak # linux
$ brew install espeak         # mac
```

All the required dependencies for Sage are now installed. Keep reading to
add optional APIs (e.g. news), or see [Usage](usage.md) to configure and run
Sage.

## Optional APIs

These APIs really increase the usability of Sage, since they add modules such as
[WolframAlpha](http://wolframalpha.com).

### WolframAlpha

Sign up for a WolframAlpha API key to take advantage of WolframAlpha's powerful
knowledge engine. See [Modules](#modules.md) for usage.

1. Go to [WolframAlpha's developer page](http://www.wolframalpha.com/widgets/).
2. Sign in or create an account.
3. Go to "My Apps" at the top of the page, and choose "Get an AppID".
4. Choose any name and description for you application, then continue.

Keep your API key handy for configuration.

