const Tetzlaff = require('./dist/tetzlaff.js');

new Tetzlaff({
  token: process.env.token,
  name: process.env.name,
  icon: process.env.icon,
  wordsFile: process.env.wordsFile,
});
