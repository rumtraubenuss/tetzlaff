'use strict';

const fs = require('fs');
const readline = require('readline');
const path = require('path');
const Bot = require('slackbots');
const request = require('request');

class Tetzlaff extends Bot {
  constructor(settings) {
    super(settings);

    this.settings = settings;
    this.params = {
      icon_url: this.settings.icon,
    };
    this.words = [];

    this.on('start', this.init);
    this.on('message', this.onMessage);

    this.loadWords();
  }

  loadWords() {
    const lineReader = readline.createInterface({
      input: request(this.settings.wordsFileUrl)
    });
    lineReader.on('line', line => {
      this.words.push(line);
    });
    lineReader.on('close', () => {
      console.log(`Loaded ${this.words.length} words.`);
    });
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
        this.postMessageToGroup(chat.name, this.getRandomSwearwordMessage(), this.params);
      }
      if(chat.is_channel) {
        this.postMessageToChannel(chat.name, this.getRandomSwearwordMessage(), this.params);
      }
    }
  }

  getRandomSwearwordMessage() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }
}

module.exports = Tetzlaff;
