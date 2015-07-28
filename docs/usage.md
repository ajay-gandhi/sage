# Usage

First ensure you've [installed all the dependencies](installation.md).

## Configuration

Before running Sage, you must run the configuration script:

```bash
$ ./app.js --configure
```

Sage will ask you several questions such as what Sage should call you and your
[Google Speech API key](installation.md#GoogleAPIs). The config data is stored in
`~/.sage.json`.

## Running

After configuring, just run `app.js`:

```bash
    $ ./app.js
```

## Interaction

Sage is always listening for the hotword(s) that you chose during Configuration.
The default is simply the word "sage".

You should ask your question after saying the hotword (in one sentence). Here
are some examples using "sage" as the hotword:

* Hey Sage, what time is it?
* Ok Sage, tell me the weather.

See [Modules](modules.md) for information on what kinds of questions you can
ask.

