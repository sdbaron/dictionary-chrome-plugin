import React from 'react';

export default function Means(props) {
    if (!props.means || !props.means.length) return (null);
    const means = props.means.map((item, index) =>
        <li key={index} className="card-mean"><a href="" className="card-mean-href">{item.text}</a></li>
    );
    return (<ul className="card-means">{means}</ul>);
}

