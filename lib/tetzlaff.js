'use strict';

const Bot = require('slackbots');

class Tetzlaff extends Bot {
  constructor(settings) {
    super(settings);
    this.settings = settings;
    this.settings.name = this.settings.name || 'tetzlaff';
    this.on('start', this.init);
    this.on('message', this._onMessage);
  }

  init() {
    //this.postMessageToChannel(this.channels[0].name, 'Hello channel!');
    this._loadBotUser();
    this.postMessageToGroup('testing', 'Hello channel!');
  }

  _onMessage(message) {
    //this.postMessageToGroup('testing', 'Message?');
    //console.log('GOT MESSAGE', this._isMentioningBot(message));
    if (this._isChatMessage(message) &&
        this._isChannelOrGroupConversation(message) &&
          !this._isFromThisBot(message) &&
            this._isMentioningBot(message)
       ) {
         const channel = this._getChannelById(message.channel);
         //console.log(channel);
         //console.log(message);
         this.postMessageToGroup('testing', 'Jo?');
       }
  }

  _getChannelById(channelId) {
    return [...this.channels, ...this.groups].find(item => item.id === channelId);
  }

  _loadBotUser() {
    this.user = this.users.filter(user => user.name === this.settings.name)[0];
  }

  _isChatMessage(message) {
    return message.type === 'message' && !!message.text;
  }

  _isChannelOrGroupConversation(message) {
    return typeof message.channel === 'string' &&
      (message.channel[0] === 'C' || message.channel[0] === 'G');
  }

  _isFromThisBot(message) {
    return message.user === this.user.id;
  }

  _isMentioningBot(message) {
    return message.text.toLowerCase().indexOf(this.settings.name) > -1 ||
      message.text.indexOf(`@${this.user.id}`) > -1;
  }
}

module.exports = Tetzlaff;
