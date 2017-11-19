import React from 'react';
import CardMarks from './marks';

export default function Synonyms(props) {
    if (!props.synonyms || !props.synonyms.length) return (null);
    const synonyms = props.synonyms.map((syn, index) =>
        <li key={index} className="card-synonym-list__item">
            <a href="" className="card-synonym-list__item-text">{syn.text}</a>
            <CardMarks def={syn}/>
        </li>
    );
    return ( <ul className="card-synonym-list">{synonyms}</ul>)
}
