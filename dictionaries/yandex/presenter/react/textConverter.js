'use strict';
import render from './card.jsx';

import '../card.scss';


class TextConverter {
    static getHtml(data, parentElement) {
        render(parentElement);
    }
}

export default TextConverter;


