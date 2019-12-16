'use strict';
import render from './card.jsx';
import './card.scss';

export class TextConverter {
    static getHtml(data, parentElement) {
        render(parentElement, data);
    }
}
