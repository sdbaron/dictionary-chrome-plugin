import React from 'react';
import ReactDOM from 'react-dom';


function ClearDelimiter() {
    return (<div className="clear"/>);
}

function listItems(items, className){
    return items.map((item, index) =>
        <li key={index} className={className}>{item.text}</li>
    );
}

function Examples(props) {
    if (!props.examples || !props.examples.length) return (null);
    const examples = props.examples.map((item, index) =>
        <li key={index} className="card-example">
            <div className="card-example-text">{item.text}</div>
            <ExamplesTranslates trans={item.tr}/>
        </li>
    );
    return (<ul className="card-examples">{examples}</ul> );

    function ExamplesTranslates(props) {
        if (!props.trans || !props.trans.length) return (null);
        // const trans = props.trans.map((item, index) =>
        //     <li key={index} className="card-example-translate">{item.text}</li>
        // );

        return (<ul className="card-example-translates">{listItems(props.trans, "card-example-translate")}</ul>);
    }
}

function Means(props) {
    if (!props.means || !props.means.length) return (null);
    const means = props.means.map((item, index) =>
        <li key={index} className="card-mean"><a href="" className="card-mean-href">{item.text}</a></li>
    );
    return (<ul className="card-means">{means}</ul>);
}

function Synonyms(props) {
    if (!props.synonyms || !props.synonyms.length) return (null);
    const synonyms = props.synonyms.map((syn, index) =>
        <li key={index} className="card-synonym-list__item">
            <a href="" className="card-synonym-list__item-text">{syn.text}</a>
            <CardMarks def={syn}/>
        </li>
    );
    return ( <ul className="card-synonym-list">{synonyms}</ul>)
}

function CardTranslates(props) {
    const trs = props.translates.map((tr, index) =>
        <li key={index} className="card-translate">
            <a href="" className="card-translate-text" title="{tr.pos}">{tr.text}</a>
            <CardMarks def={tr}/>
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

function CardMarks(props) {
    return (
        <div className="card-marks">
            <span className="cart-marks__gen">{props.def.gen}</span>
            <span className="cart-marks__fl">{props.def.fl}</span>
        </div>
    );
}

function CardDefinition(props) {
    const defs = props.defs.map((def, index) =>
        <li key={index} className="card-def">
            <span className="card-def-text">{def.text}</span>
            <span className="card-def-pos">{def.pos}</span>

            <CardMarks def={def}/>
            <span className="card-def__examples-toggle" data-text-show="показать примеры"
                  data-text-hide="скрыть примеры"/>
            <CardTranslates translates={def.tr}/>
        </li>
    );

    return (
        <ul className="card-defs examples-expanded">{defs}</ul>
    )
}

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="card"><CardDefinition defs={this.props.def}/></div>
        )
    }

}

function render(rootElement, data) {
    ReactDOM.render(
        <Card def={data.def}/>,
        rootElement
    );
}

export default render;