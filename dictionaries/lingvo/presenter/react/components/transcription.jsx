import React from 'react';

export default function CardTranscription(props) {
    if (!props.def) return (null)
    return (
        <span className="sdb-popup-card-transcription">[{props.def}]</span>
    );
}
