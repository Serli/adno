import { Component } from 'react';
import { withRouter } from "react-router";

// Import React components
import TTS from "../../AdnoEditor/TTS/TTS"

// Import Utils
import { buildTagsList, stripHtml } from "../../../../Utils/utils";
import ReactHtmlParser from 'react-html-parser';

// Import CSS
import "./ViewerAnnotationCards.css";

class ViewerAnnotationCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentAnno: -1
        }
    }

    selectAnno = (position) => {
        document.getElementsByTagName("iiif-storyboard")[0].__vue_custom_element__.$children[0].sendMessage({ 'function': 'next', 'args': position });

        this.setState({ currentAnno: position })
    }

    unselectAnno = () => {
        document.getElementsByTagName("iiif-storyboard")[0].__vue_custom_element__.$children[0].sendMessage({ 'function': 'next', 'args': -1 });

        this.setState({ currentAnno: -1 })
    }



    render() {
        return (
            <div className="adno-viewer-list-annos">


                {/* {
                    document.getElementsByTagName("iiif-storyboard")[0] &&
                    document.getElementsByTagName("iiif-storyboard")[0].__vue_custom_element__
                    &&
                    document.getElementsByTagName("iiif-storyboard")[0].__vue_custom_element__.$children[0].position
                    && <p>{document.getElementsByTagName("iiif-storyboard")[0].__vue_custom_element__.$children[0].position}</p>
                }

                <button onClick={() => console.log(document.getElementsByTagName("iiif-storyboard")[0].__vue_custom_element__.$children[0].position)}>Click</button> */}

                <h3 className="adno-viewer-nb-annos"> {this.props.annotations.length} annotation(s) trouvée(s)</h3>

                {this.props.annotations.map((annotation, index) => {
                    return (
                        <div key={`viewer_anno_${index}`} onClick={() => this.state.currentAnno === index ? this.unselectAnno() : this.selectAnno(index)} className={this.state.currentAnno === index ? "adno-viewer-card selectedAnno" : "adno-viewer-card"}>
                            <div className="anno-card-body">
                                <h6 className="card-subtitle mb-2 text-muted"> {buildTagsList(annotation)} </h6>

                                <h5 className="card-title adno-card-title">{annotation.body[0] && annotation.body[0].value ? ReactHtmlParser(annotation.body[0].value) : "Aucun titre"}</h5>

                                {/* <h6>{annotation.body.filter(anno => anno.purpose === "commenting").length - 1} réponse(s) associée(s)</h6> */}

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