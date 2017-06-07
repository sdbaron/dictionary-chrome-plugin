'use strict';
import render from './card.jsx';

import '../card.scss';
import './card.scss';


class TextConverter {
    static getHtml(data, parentElement) {
        render(parentElement, data);
    }
}

export default TextConverter;


