import React from 'react';

export default function Article(props) {
    if (props.def.pos !== 'noun') return (null)
    const v = { m: 'der', f: 'die', n: 'das' }
    const article = v[props.def.gen]
    return (
        <span className="sdb-popup-card-article">{article}</span>
    );
}
