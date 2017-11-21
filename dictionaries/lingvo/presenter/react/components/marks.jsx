import React from 'react';

export default function CardMarks(props) {
    return (
        <div className="sdb-popup-card-marks">
            <span className="sdb-popup-card-marks__gen">{props.def.gen}</span>
            <span className="sdb-popup-card-marks__fl">{props.def.fl}</span>
        </div>
    );
}