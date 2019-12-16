'use strict'
const templateButton = require('./soundButton.pug');

// import './card.scss';

export function getHtml(parentElement, data) {
  return templateButton(parentElement, data)
}
