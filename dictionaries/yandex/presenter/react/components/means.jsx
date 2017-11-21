import React from 'react';

export default function Means(props) {
    if (!props.means || !props.means.length) return (null);
    const means = props.means.map((item, index) =>
        <li key={index} className="sdb-popup-card-mean"><a href="" className="sdb-popup-card-mean-href">{item.text}</a></li>
    );
    return (<ul className="sdb-popup-card-means">{means}</ul>);
}

