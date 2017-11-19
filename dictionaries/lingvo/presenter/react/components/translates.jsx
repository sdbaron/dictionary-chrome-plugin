import React from 'react';

import Synonyms from './synonyms';
import Examples from './examples';
import CardMarks from './marks';
import Means from './means';

export default function CardTranslates(props) {
    const trs = props.translates.map((tr, index) =>
        <li key={index} className="card-translate">
            <TranslateText text={tr.text} hint={tr.pos} hasSynonyms={tr.syn && tr.syn.length} tr={tr}/>
            <Synonyms synonyms={tr.syn}/>
            <div className="clear"/>
            <Means means={tr.mean}/>
            <Examples examples={tr.ex}/>
        </li>
    );

    return (
        <ol className="card-translates">{trs}</ol>
    )
}

function TranslateText(props) {
    return (
        <div className="card-translate__main-block">
            <a href="" className="card-translate-text" title={props.hint}>{props.text}</a>
            <CardMarks def={props.tr}/>
        </div>
    )
}
