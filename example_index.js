const path = require('path');
const Tetzlaff = require('./lib/tetzlaff.js');

new Tetzlaff({
  token: 'YOUR_SLACK_BOT_TOKEN',
  name: 'BOT_NAME',
  icon: 'URL_TO_ICON_IMAGE',
  wordsFile: path.resolve(__dirname, 'NAME_WORD_FILE'),
});
