'use strict';
const cardTemplate = require('./card.pug');
import '../card.scss';

export class TextConverter {
    static getHtml(data) {
        const r = cardTemplate(Object.assign({
            glob: {
                gen: '',
                fl: ''
            }
        }, data));
        return r;
    }
}
