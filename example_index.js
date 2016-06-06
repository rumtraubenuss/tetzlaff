const Tetzlaff = require('./lib/tetzlaff.js');

const tez = new Tetzlaff({
  token: 'YOUR_SLACK_BOT_TOKEN',
  icon: 'URL_TO_ICON_IMAGE',
  name: 'BOT_NAME',
  wordsFile: 'NAME_WORDFILE',
});
