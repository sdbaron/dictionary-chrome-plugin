import React from 'react';

export default function CardTranscription(props) {
    if (!props.def) return (null)
    return (
        <span className="card-transcription">[{props.def}]</span>
    );
}
