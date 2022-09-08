import { Component } from "react";
import { withRouter } from "react-router-dom";

// Import popup alerts
import Swal from "sweetalert2";

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
            annotation: []
        }
    }

    componentDidMount() {

        if (!checkIfProjectExists(this.props.match.params.id)) {
            this.props.history.push("/")
        }

        // Create viewer 

        // Find annotations from the localStorage in JSON format
        var annotations = this.props.match.params.id + "_annotations"

        this.setState({ annotations })

        var annos = localStorage.getItem(annotations)


        // Check if there is at least one annotation
        if (annos && annos != JSON.stringify([])) {
            // Create the dataURI linked to the annotations
            const dataURI = "data:application/json;base64," + btoa(annos);

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

                {
                    JSON.parse(localStorage.getItem(this.props.match.params.id + "_annotations")) && JSON.parse(localStorage.getItem(this.props.match.params.id + "_annotations")).length > 0 ?
                        <div className="adno-viewer-leftbar">
                            <ViewerAnnotationCards annotations={JSON.parse(localStorage.getItem(this.props.match.params.id + "_annotations"))} />
                        </div>
                        : <></>
                }



                <div className={JSON.parse(localStorage.getItem(this.props.match.params.id + "_annotations")) && JSON.parse(localStorage.getItem(this.props.match.params.id + "_annotations")).length > 0 ? "adno-viewer-rightbar" : "adno-viewer-rightbar-without-annos"}>
                    <div className="col">
                        <div className="card mb-3">
                            <div className="card">
                                <div className="card-body project-body">


                                    <div className="project-body-left">
                                        <h5 id="project_name" className="card-title">{checkIfProjectExists(this.props.match.params.id) && JSON.parse(localStorage.getItem(this.props.match.params.id)).title}</h5>
                                        <p id="project_desc" className="card-text">{checkIfProjectExists(this.props.match.params.id) && JSON.parse(localStorage.getItem(this.props.match.params.id)).description}</p>
                                    </div>

                                    <div className="project-body-right">
                                        <button id="edit-project" className="btn btn-primary" onClick={() => this.props.history.push("/edit/" + this.props.match.params.id)}>Editer ce projet</button>
                                    </div>

                                </div>

                                <div id="image_iiif" style={{ "width": "1200px", "height": "600px" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Viewer)