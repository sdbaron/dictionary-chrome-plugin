import React from 'react';

export default function CardMarks(props) {
    return (
        <div className="card-marks">
            <span className="cart-marks__gen">{props.def.gen}</span>
            <span className="cart-marks__fl">{props.def.fl}</span>
        </div>
    );
}