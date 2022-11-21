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
    selectAnno = (position) => {
        document.getElementsByTagName("iiif-storyboard")[0].__vue_custom_element__.$children[0].sendMessage({'function':'next', 'args': position});
        
        this.props.setCurrentAnno(position)
    }

    unselectAnno = () => {
        document.getElementsByTagName("iiif-storyboard")[0].__vue_custom_element__.$children[0].sendMessage({'function':'next', 'args': -1});
        
        this.props.setCurrentAnno(-1)
    }

    render() {
        return (
            <div className="adno-viewer-list-annos">

                <h3 className="adno-viewer-nb-annos"> {this.props.annotations.length} annotation(s) trouvée(s)</h3>

                {this.props.annotations.map((annotation, index) => {
                    return (
                        <div key={`viewer_anno_${index}`} onClick={() => this.props.currentAnno === index ? this.unselectAnno() : this.selectAnno(index)} className={this.props.currentAnno === index ? "adno-viewer-card selectedAnno": "adno-viewer-card"}>
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