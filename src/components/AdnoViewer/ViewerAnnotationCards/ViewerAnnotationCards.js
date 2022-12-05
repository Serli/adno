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
                {
                    this.props.selectedProject.id &&
                    <>
                        <label className="label">
                            <span className="label-text">Identifier</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs" value={this.props.selectedProject.id} disabled />
                    </>
                }

                {
                    this.props.selectedProject.manifest_url &&
                    <>
                        <label className="label">
                            <span className="label-text">Source</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs" value={this.props.selectedProject.manifest_url} disabled />
                    </>
                }

                {
                    this.props.selectedProject.img_url &&
                    <>
                        <label className="label">
                            <span className="label-text">img_url</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs" value={this.props.selectedProject.img_url} disabled />
                    </>
                }
                { this.props.selectedProject.creation_date &&
                    <>
                        <label className="label">
                            <span className="label-text">Date de création</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs" value={this.props.selectedProject.creation_date} disabled />
                    </>

                }
                {
                    this.props.selectedProject.last_update && <>
                        <label className="label">
                            <span className="label-text">Dernière modification</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs" value={this.props.selectedProject.last_update} disabled />
                    </>
                }

                <label className="label">
                    <span className="label-text">Format</span>
                </label>
                <input type="text" className="input input-bordered w-full max-w-xs" value="Adno" disabled />

                {
                    this.props.selectedProject.rights && <>
                        <label className="label">
                            <span className="label-text">Droits attribués</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs" value={this.props.selectedProject.rights} disabled />
                    </>
                }

                {
                    this.props.selectedProject.title &&
                    <>
                        <label className="label">
                            <span className="label-text">Titre</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs" value={this.props.selectedProject.title} disabled />
                    </>
                }

                {
                    this.props.selectedProject.description &&
                    <>
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs" value={this.props.selectedProject.description} disabled />
                    </>
                }

                {
                    this.props.selectedProject.autor &&
                    <>
                        <label className="label">
                            <span className="label-text">Auteur</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs" value={this.props.selectedProject.autor} disabled />
                    </>
                }

                {
                    this.props.selectedProject.editor &&
                    <>
                        <label className="label">
                            <span className="label-text">Editeur</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs" value={this.props.selectedProject.editor} disabled />
                    </>
                }

                <h3 className="adno-viewer-nb-annos"> {this.props.annotations.length < 1 ? "Aucune" : this.props.annotations.length} {`annotation${this.props.annotations.length > 1 ? "s": ""} trouvée${this.props.annotations.length > 1 ? "s": ""}`}</h3>

                {this.props.annotations.map((annotation, index) => {
                    return (
                        <div key={`viewer_anno_${index}`} onClick={() => this.state.currentAnno === index ? this.unselectAnno() : this.selectAnno(index)} className={this.state.currentAnno === index ? "adno-viewer-card selectedAnno" : "adno-viewer-card"}>
                            <div className="anno-card-body">
                                <h6 className="card-subtitle mb-2 text-muted"> {buildTagsList(annotation)} </h6>

                                <h5 className="card-title adno-card-title">{annotation.body[0] && annotation.body[0].value ? ReactHtmlParser(annotation.body[0].value) : "Aucun titre"}</h5>
                            </div >
                        </div >
                    )
                })}
            </div >
        )
    }
}
export default withRouter(ViewerAnnotationCards)