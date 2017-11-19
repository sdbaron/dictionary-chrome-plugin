'use strict';
const cardTemplate = require('./card.mst');
const cardMarksTemplate = require('./card-marks.mst');
import '../card.scss';

class TextConverter {
    static getHtml(data) {
        return cardTemplate.render(data, {marks: cardMarksTemplate});
    }
}

export default TextConverter;


