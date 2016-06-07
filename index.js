const path = require('path');
const Tetzlaff = require('./lib/tetzlaff.js');

new Tetzlaff({
  token: process.env.token,
  name: process.env.name,
  icon: process.env.icon,
  wordsFileUrl: process.env.wordsFileUrl,
});
