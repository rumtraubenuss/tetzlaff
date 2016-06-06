'use strict';

const Bot = require('slackbots');

class Tetzlaff extends Bot {
  constructor(settings) {
    super(settings);
    this.settings = settings;
    this.settings.name = this.settings.name || 'tetzlaff';
    this.on('start', this.init);
    this.on('message', this.onMessage);
  }

  loadBotUser() {
    this.user = this.users.find(user => user.name === this.settings.name);
  }

  init() {
    this.loadBotUser();
  }

  isMessageForThisBot(message) {
    return (
      this.isChatMessage(message) && this.isChannelOrGroupConversation(message)
      && !this.isFromThisBot(message) && this.isMentioningBot(message)
    );
  }

  getChatTypeById(channelId) {
    return [...this.channels, ...this.groups].find(item => item.id === channelId);
  }

  isChatMessage(message) {
    return message.type === 'message' && !!message.text;
  }

  isChannelOrGroupConversation(message) {
    return typeof message.channel === 'string' &&
      (message.channel[0] === 'C' || message.channel[0] === 'G');
  }

  isFromThisBot(message) {
    return message.user === this.user.id;
  }

  isMentioningBot(message) {
    return message.text.toLowerCase().indexOf(this.settings.name) > -1 ||
      message.text.indexOf(`@${this.user.id}`) > -1;
  }

  onMessage(message) {
    if (this.isMessageForThisBot(message)) {
      const chat = this.getChatTypeById(message.channel);
      if(chat.is_group) {
        this.postMessageToGroup(chat.name, 'Jo?');
      }
      if(chat.is_channel) {
        this.postMessageToChannel(chat.name, 'Jo?');
      }
    }
  }
}

module.exports = Tetzlaff;
