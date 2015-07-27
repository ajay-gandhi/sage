# Sage

A voice personal assistant build on Node.js

- [Usage](#usage)
- [Installation](#installation)

## Usage

Before running Sage, you must run the configuration script:

```bash
$ ./app.js --configure
```

Sage will ask you several questions, including your
[Google Speech API key](#installation). The config data is stored in
`~/.sage.json`.

After configuring, just run `app.js`:

```bash
    $ ./app.js
```

## Installation

Sage runs on [Node.js](http://nodejs.org), so you must have that installed,
along with [npm](http://npmjs.org).

### Google APIs

Sage uses Google APIs for all speech-to-text and text-to-speech conversion.
The former requires an API key, but the latter does not.

To obtain an API key for the Google Speech API (speech-to-text), follow these
steps:

1. Join the [Chromium Dev Group](https://groups.google.com/a/chromium.org/forum/#!forum/chromium-dev)
   on Google Groups. This unhides the Speech API in the developer console.
2. Go to the [Google Developers Console](https://console.developers.google.com)
   and create a project.
3. In the sidebar on the left, click on "APIs & auth", then click on "APIs".
4. Search for "Speech", and click on Speech API. Click on "Enable".
5. Now you have access to the Speech API. To get your API key, click on
   "Credentials" under "APIs & auth".
6. Create a new public key

Keep your API key handy.

### Node.js Dependencies

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

All the dependencies for Sage are now installed. See [Usage](#usage) to
configure and run Sage.

Based loosely on [Jasper](http://jasperproject.github.io).
