import { Component } from "react";
import { withRouter } from "react-router-dom";

// Import utils
import { checkIfProjectExists, createExportProjectJsonFile } from "../../../Utils/utils";

// Import libraries
import "../../libraries/annona-reworked/js/storyboard";
import "../../libraries/openseadragon/openseadragon.min.js";

// Import React Components
import ViewerAnnotationCards from "./ViewerAnnotationCards/ViewerAnnotationCards";

// Imports CSS
import "./Viewer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPlayCircle, faStopCircle } from "@fortawesome/free-solid-svg-icons";

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annotations: [],
            selectedProject: {},
            isPlaying: false,
            compteur: 0,
            currentAnno: -1
        }
    }

    componentDidMount() {
        if (!checkIfProjectExists(this.props.match.params.id_project)) {
            this.props.history.push("/")
        }
        // Find annotations from the localStorage in JSON format

        // var annos = localStorage.getItem(`${this.props.match.params.id_project}_annotations`)
        var annos = JSON.stringify(JSON.parse(localStorage.getItem(this.props.match.params.id_journey)).items)
        var actualProj = localStorage.getItem(this.props.match.params.id_project)

        // Check if there is at least one annotation
        if (annos && JSON.parse(annos).length > 0) {

            this.setState({ annotations: JSON.parse(annos), selectedProject: JSON.parse(actualProj) })

            // Create the dataURI linked to the annotations
            const dataURI = "data:application/json;base64," + btoa(annos);

            // Create and display an annona storyboard 
            document.getElementById("image_iiif").innerHTML = '<iiif-storyboard  styling="toggleoverlay: true; tts=true;" annotationurl="' + dataURI + '"></iiif-storyboard>';

        } else {
            if (checkIfProjectExists(this.props.match.params.id_project) && JSON.parse(localStorage.getItem(this.props.match.params.id_project)).manifest_url) {
                OpenSeadragon({
                    id: 'image_iiif',
                    tileSources: [JSON.parse(localStorage.getItem(this.props.match.params.id_project)).manifest_url],
                    prefixUrl: 'https://openseadragon.github.io/openseadragon/images/'
                });
            } else {
                OpenSeadragon({
                    id: 'image_iiif',
                    tileSources: {
                        type: 'image',
                        url: checkIfProjectExists(this.props.match.params.id_project) && JSON.parse(localStorage.getItem(this.props.match.params.id_project)).img_url
                    },
                    prefixUrl: 'https://openseadragon.github.io/openseadragon/images/'
                });
            }
        }
    }

    displayActualIndex = () => {
        console.log(document.getElementsByTagName("iiif-storyboard")[0].__vue_custom_element__.$children[0].position)
        console.log(document.getElementsByTagName("iiif-storyboard")[0].__vue_custom_element__.$children[0].annotations[0].section[0])
        console.log(document.getElementsByTagName("iiif-storyboard")[0].__vue_custom_element__.$children[0].viewer.world.getItemAt(0).imageToViewportRectangle())


        console.log(document.getElementsByTagName("iiif-storyboard")[0].__vue_custom_element__.$children[0].viewer.world.getItemAt(0).imageToViewportRectangle(1722.5394287109375,986.1527099609375,2024.2540283203125,2798.1160888671875))




        this.setState({ compteur: this.state.compteur + 1 })
    }

    startJourney = () => {
        this.setState({ isPlaying: !this.state.isPlaying })

        if (this.state.isPlaying) {
            document.getElementById("header_toolbar").style.display = "flex"
            document.getElementById("autorunButton").click()




        } else {
            document.getElementById("fullscreenButton").click()
            document.getElementById("autorunButton").click()
            document.getElementById("header_toolbar").style.display = "none"
            document.getElementById("annotation_controls").style.display = "none"

            setInterval(this.displayActualIndex, 3000);

        }


    }


    loadAnnotationMine = () => {


        if (document.getElementById("annotation_text").children[0] && document.getElementById("annotation_text").children[0].children[0] && document.getElementById("annotation_text").children[0].children[0].children[0].children) {


            console.log(`found ${document.getElementById("annotation_text").children[0].children[0].children[0].children.length} tags`);

            var allChildren = document.getElementById("annotation_text").children[0].children[0].children[0].children

            if (allChildren.length > 1) {
                for (let index = 0; index < allChildren.length; index++) {
                    console.log(allChildren[index])
                }
            }


        }

    }


    getProperties = () => {
        //get storyboard component from annona
        console.log(document.getElementsByTagName("iiif-storyboard")[0].__vue_custom_element__.$children[0].position)
    }


    nextAnno = () => {
        document.getElementsByTagName("iiif-storyboard")[0].__vue_custom_element__.$children[0].sendMessage({'function':'next', 'args': 0});
    }
    
    render() {

        if (!localStorage.getItem(this.props.match.params.id_project) || !localStorage.getItem(this.props.match.params.id_journey)) {
            window.location.href = "/"
        }

        return (
            <div className="adno-viewer">

                {/* <div className={this.state.isPlaying ? "test-card-fullscreen-playing" : "test-card-fullscreen-pause"}>

                    <h1>MON SUPER TEXTE</h1>

                </div> */}


                {/* <button onClick={() => this.loadAnnotationMine()}>Clic ici</button> */}


                {
                    // Display every annotation
                    this.state.annotations && this.state.annotations.length > 0 ?
                        <div className="adno-viewer-leftbar">
                            <ViewerAnnotationCards annotations={this.state.annotations} currentAnno={this.state.currentAnno} setCurrentAnno={(newPos) => this.setState({currentAnno: newPos})} />
                        </div>
                        : <></>
                }


                <p> <span onClick={() => this.props.history.push(`/${this.props.match.params.id_project}/journeys`)}> {this.state.selectedProject.title} </span> - {JSON.parse(localStorage.getItem(this.props.match.params.id_journey)).label} </p>


                <div className={this.state.annotations && this.state.annotations.length > 0 ? "adno-viewer-rightbar" : "adno-viewer-rightbar-without-annos"}>
                    <div className="col">
                        <div className="card mb-3">
                            <div className="card">
                                <div className="card-body project-body">


                                    <div className="project-body-left">
                                        <h5 id="project_name" className="card-title">{checkIfProjectExists(this.props.match.params.id_project) && this.state.selectedProject.title}</h5>
                                        <p id="project_desc" className="card-text">{checkIfProjectExists(this.props.match.params.id_project) && this.state.selectedProject.description}</p>
                                    </div>

                                    <div className="project-body-right">
                                        <button id="play-journey" className="btn btn-success" onClick={() => this.nextAnno()}> NEXTTTT</button>
                                        <button id="play-journey" className="btn btn-success" onClick={() => this.getProperties()}> GET ALL PROPERTIES</button>
                                        <button id="play-journey" className="btn btn-success" onClick={() => this.startJourney()}> {this.state.isPlaying ? "Stopper la lecture" : "Lire le parcours "}  <FontAwesomeIcon icon={this.state.isPlaying ? faStopCircle : faPlayCircle} /></button>
                                        <a id={"download_btn_" + this.props.match.params.id_project} href={createExportProjectJsonFile(this.props.match.params.id_project)} download={this.state.selectedProject.title + ".json"} className="btn btn-secondary btn-sm"> <FontAwesomeIcon icon={faDownload} /> Télécharger </a>
                                        <button id="edit-project" className="btn btn-primary" onClick={() => this.props.history.push(`/${this.props.match.params.id_project}/journeys/${this.props.match.params.id_journey}/edit`)}>Editer ce parcours</button>
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