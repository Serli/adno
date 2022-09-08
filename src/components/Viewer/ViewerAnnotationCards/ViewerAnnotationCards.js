import { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { withRouter } from "react-router";
import { stripHtml } from "../../../../Utils/utils";
import TTS from "../../Editor/TTS/TTS";
// Import CSS
import "./ViewerAnnotationCards.css";

class ViewerAnnotationCards extends Component {
    render() {
        const buildTagsList = (annotation) => {
            var tags = annotation.body.filter(anno_body => anno_body.purpose === "tagging")

            return tags && tags.length > 0 ? tags.reduce( (previousValue, currentValue) => previousValue + " " + currentValue.value, "[TAGS] " ) : "Aucun tag"
        }

        return (
            <>
                <h3 className="adno-viewer-nb-annos"> {this.props.annotations.length} annotation(s) trouvée(s)</h3>

                <div className="adno-viewer-list-annos">

                    {this.props.annotations.map((annotation, index) => {
                        return (
                        <div className="adno-viewer-card" key={"viewer_anno_" + index}>
                            <div className="anno-card-body">
                                <h6 className="card-subtitle mb-2 text-muted"> {buildTagsList(annotation)} </h6>
                               
                                <h5 className="card-title adno-card-title">{annotation.body[0] && annotation.body[0].value ? ReactHtmlParser (annotation.body[0].value) : "Aucun titre"}</h5>
                            
                                {/* <TTS text={stripHtml(annotation.body[0].value)} /> */}
                            </div >
                        </div >
                        )
                    })}
                </div >
            </>
        )
    }
}
export default withRouter(ViewerAnnotationCards)