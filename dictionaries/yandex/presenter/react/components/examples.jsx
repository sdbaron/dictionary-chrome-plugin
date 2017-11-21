import React from 'react';

export default function Examples(props) {
    if (!props.examples || !props.examples.length) return (null);
    const examples = props.examples.map((item, index) =>
        <li key={index} className="sdb-popup-card-example">
            <div className="sdb-popup-card-example-text">{item.text}</div>
            <ExamplesTranslates trans={item.tr}/>
        </li>
    );
    return (<ul className="sdb-popup-card-examples">{examples}</ul> );

    function ExamplesTranslates(props) {
        if (!props.trans || !props.trans.length) return (null);
        // const trans = props.trans.map((item, index) =>
        //     <li key={index} className="sdb-popup-card-example-translate">{item.text}</li>
        // );

        return (<ul className="sdb-popup-card-example-translates">{listItems(props.trans, "card-example-translate")}</ul>);
    }
}

function listItems(items, className) {
    return items.map((item, index) =>
        <li key={index} className={className}>{item.text}</li>
    );
}

