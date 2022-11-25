import { Component } from "react";
import { withRouter } from "react-router-dom";

// Import FontAwesome and icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";

// Import utils
import { checkIfProjectExists } from "../../../Utils/utils";

// Import libraries
import "../../libraries/annona-reworked/js/storyboard";
import "../../libraries/openseadragon/openseadragon.min.js";

// Import React Components
import ViewerAnnotationCards from "./ViewerAnnotationCards/ViewerAnnotationCards";

// Imports CSS
import "./Viewer.css";

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annotations: [],
            selectedProject: {}
        }
    }

    componentDidMount() {

        if (!checkIfProjectExists(this.props.match.params.id)) {
            this.props.history.push("/")
        }
        // Find annotations from the localStorage in JSON format

        var annos = localStorage.getItem(`${this.props.match.params.id}_annotations`)
        var actualProj = localStorage.getItem(this.props.match.params.id)

        // Check if there is at least one annotation
        if (annos && JSON.parse(annos).length > 0) {

            this.setState({ annotations: JSON.parse(annos), selectedProject: JSON.parse(actualProj) })

            // Create the dataURI linked to the annotations
            const dataURI = "data:application/json;base64," + btoa(unescape(encodeURIComponent(annos)));

            // Create and display an annona storyboard 
            document.getElementById("image_iiif").innerHTML = '<iiif-storyboard  styling="toggleoverlay: true; tts=true;" annotationurl="' + dataURI + '"></iiif-storyboard>';

        } else {
            if (checkIfProjectExists(this.props.match.params.id) && JSON.parse(localStorage.getItem(this.props.match.params.id)).manifest_url) {
                OpenSeadragon({
                    id: 'image_iiif',
                    tileSources: [JSON.parse(localStorage.getItem(this.props.match.params.id)).manifest_url],
                    prefixUrl: 'https://openseadragon.github.io/openseadragon/images/'
                });
            } else {
                OpenSeadragon({
                    id: 'image_iiif',
                    tileSources: {
                        type: 'image',
                        url: checkIfProjectExists(this.props.match.params.id) && JSON.parse(localStorage.getItem(this.props.match.params.id)).img_url
                    },
                    prefixUrl: 'https://openseadragon.github.io/openseadragon/images/'
                });
            }
        }

    }

    render() {
        return (
            <div className="adno-viewer">

                <button className="btn btn-primary back-home-viewer" onClick={() => this.props.history.push("/")}> <FontAwesomeIcon icon={faArrowLeft} /> Retour à l'accueil</button>

                {
                    // Display every annotation
                    this.state.annotations && this.state.annotations.length > 0 &&
                    <div className="adno-viewer-leftbar">
                        <ViewerAnnotationCards annotations={this.state.annotations} />
                    </div>
                }

                <div className={this.state.annotations && this.state.annotations.length > 0 ? "adno-viewer-rightbar" : "adno-viewer-rightbar-without-annos"}>
                    <div className="col">
                        <div className="card mb-3">
                            <div className="card">
                                <div className="card-body project-body">


                                    <div className="project-body-left">
                                        <h5 id="project_name" className="card-title">{checkIfProjectExists(this.props.match.params.id) && this.state.selectedProject.title}</h5>
                                        <p id="project_desc" className="card-text">{checkIfProjectExists(this.props.match.params.id) && this.state.selectedProject.description}</p>
                                    </div>

                                    {
                                        process.env.ADNO_MODE === "FULL" &&
                                        <div className="project-body-right">
                                            <button id="edit-project" className="btn btn-primary" onClick={() => this.props.history.push("/edit/" + this.props.match.params.id)}> <FontAwesomeIcon icon={faEdit} />  Editer ce projet</button>
                                        </div>
                                    }



                                </div>

                                {
                                    this.state.annotations.length >= 1 ?
                                        <div id="image_iiif_annotations"></div>
                                        :
                                        <div id="image_iiif"></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Viewer)