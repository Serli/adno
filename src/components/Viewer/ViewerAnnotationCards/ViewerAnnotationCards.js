import { Component } from 'react';
import { withRouter } from "react-router";

// Import React components
import TTS from "../../Editor/TTS/TTS";

// Import Utils
import { buildTagsList, stripHtml } from "../../../../Utils/utils";
import ReactHtmlParser from 'react-html-parser';

// Import CSS
import "./ViewerAnnotationCards.css";

class ViewerAnnotationCards extends Component {
    render() {
        return (
            <div className="adno-viewer-list-annos">

                <h3 className="adno-viewer-nb-annos"> {this.props.annotations.length} annotation(s) trouvée(s)</h3>

                {this.props.annotations.map((annotation, index) => {
                    return (
                        <div className="adno-viewer-card" key={`viewer_anno_${index}`}>
                            <div className="anno-card-body">
                                <h6 className="card-subtitle mb-2 text-muted"> {buildTagsList(annotation)} </h6>

                                <h5 className="card-title adno-card-title">{annotation.body[0] && annotation.body[0].value ? ReactHtmlParser(annotation.body[0].value) : "Aucun titre"}</h5>


                                <h6>{annotation.body.length - 1} réponse(s) associée(s)</h6>

                                {/* <TTS text={stripHtml(annotation.body[0].value)} /> */}
                            </div >
                        </div >
                    )
                })}
            </div >
        )
    }
}
export default withRouter(ViewerAnnotationCards)