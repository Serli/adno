import { Component } from "react";
import { withRouter } from "react-router-dom";

// Import FontAwesome and icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBook, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";

// Import utils
import { checkIfProjectExists } from "../../../Utils/utils";

// Import libraries
import "../../libraries/annona-reworked/js/storyboard";
import "../../libraries/openseadragon/openseadragon.min.js";
// Imports CSS
import "./AdnoViewer.css";

class AdnoViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annotations: [],
            selectedProject: {},
            editedMode: false
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

                {
                    this.state.annotations.length >= 1 ?
                        <div id="image_iiif_annotations"></div>
                        :
                        <div id="image_iiif"></div>
                }
            </div>
        )
    }
}

export default withRouter(AdnoViewer)