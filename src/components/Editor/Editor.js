import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { withRouter } from "react-router";

// Import utils
import { checkIfProjectExists, createExportProjectJsonFile, insertInLS } from "../../../Utils/utils";

// Import Components
import AnnotationCards from "./AnnotationCards/AnnotationCards";

// Import CSS
import "./Editor.css";

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileMode: false,
            selected_project: JSON.parse(localStorage.getItem(this.props.match.params.id)),
            annotations: JSON.parse(localStorage.getItem(`${this.props.match.params.id}_annotations`))
        }
    }

    // Function to update the name of the selected project
    updateProjectName(e) {

        let project = this.state.selected_project

        project.title = e.target.value
        project.last_update = new Date()

        this.setState({ selected_project: project })

        insertInLS(project.id, JSON.stringify(project))
    }

    // Function to update the description of the selected project
    updateProjectDesc(e) {

        let project = this.state.selected_project

        project.description = e.target.value
        project.last_update = new Date()

        this.setState({ selected_project: project })

        insertInLS(project.id, JSON.stringify(project))
    }


    createViewer(tileSources) {
        return OpenSeadragon({
            id: 'openseadragon1',
            tileSources: tileSources,
            prefixUrl: 'https://openseadragon.github.io/openseadragon/images/'
        });
    }

    functionToLoadAnnotorious(viewer) {
        return OpenSeadragon.Annotorious(viewer, {
            locale: 'auto',
            drawOnSingleClick: true,
            allowEmpty: true,
            disableEditor: false
        });
    }

    componentDidMount() {

        // First of all, verify if the UUID match to an real project in the localStorage
        // If not, then redirect the user to the HomePage
        if (!this.props.match.params.id || !checkIfProjectExists(this.props.match.params.id)) {
            this.props.history.push("/")
        } else {
            let selected_project = JSON.parse(localStorage.getItem(this.props.match.params.id))

            let tileSources;

            if (JSON.parse(localStorage.getItem(this.props.match.params.id)).manifest_url) {

                tileSources = [
                    JSON.parse(localStorage.getItem(this.props.match.params.id)).manifest_url
                ]

            } else {
                tileSources = {
                    type: 'image',
                    url: JSON.parse(localStorage.getItem(this.props.match.params.id)).img_url
                }
            }

            let adnoViewer = this.createViewer(tileSources)

            let anno = this.functionToLoadAnnotorious(adnoViewer)

            // var anno = OpenSeadragon.Annotorious(viewer, {
            //     locale: 'auto',
            //     drawOnSingleClick: true,
            //     allowEmpty: true,
            //     disableEditor: false
            // });

            // Find annotations from the localStorage in JSON format
            var annos = localStorage.getItem(`${selected_project.id}_annotations`)

            // Generate dataURI and load annotations into Annotorious
            const dataURI = "data:application/json;base64," + btoa(unescape(encodeURIComponent(annos)));
            anno.loadAnnotations(dataURI)


            Annotorious.SelectorPack(anno);
            Annotorious.BetterPolygon(anno);
            Annotorious.Toolbar(anno, document.getElementById('toolbar-container'));

            // Manage creation of new annotation
            anno.on('createAnnotation', (annotation) => {
                var annotations = JSON.parse(localStorage.getItem(`${selected_project.id}_annotations`))

                // reorganize properties 
                const newAnnotation = {
                    "@context": "http://www.w3.org/ns/anno.jsonld",
                    "id": annotation.id,
                    "type": annotation.type,
                    "body": annotation.body,
                    "target": annotation.target,
                    "modified": new Date(),
                    "created": new Date()
                }

                if (!annotations) {
                    annotations = [
                        newAnnotation
                    ]
                } else {
                    annotations.push(newAnnotation)
                }

                // Update the last update date for the selected project
                selected_project.last_update = new Date()
                insertInLS(selected_project.id, JSON.stringify(selected_project))

                // Update annotations linked to the selected project in the localStorage
                insertInLS(`${selected_project.id}_annotations`, JSON.stringify(annotations))

                this.setState({ annotations })

            });

            // Manage update of annotation
            anno.on('updateAnnotation', (upated_anno) => {
                let annotations = JSON.parse(localStorage.getItem(`${selected_project.id}_annotations`))

                let selected_anno = annotations.filter(anno => anno.id === upated_anno.id)[0]

                Object.assign(selected_anno, upated_anno);

                // Update the last update in the project
                selected_project.last_update = new Date()
                insertInLS(selected_project.id, JSON.stringify(selected_project))

                // Save the updated annotation in the localStorage
                insertInLS(`${selected_project.id}_annotations`, JSON.stringify(annotations))

                this.setState({ annotations })
            });

            anno.on('deleteAnnotation', (del_anno) => {
                let annotations = JSON.parse(localStorage.getItem(`${selected_project.id}_annotations`))

                if (annotations && annotations.length === 1) {
                    localStorage.removeItem(`${selected_project.id}_annotations`)
                    this.setState({ annotations: annotations.filter(anno => anno.id !== del_anno.id) })
                } else {
                    // Delete the annotation in the localStorage
                    insertInLS(`${selected_project.id}_annotations`, JSON.stringify(annotations.filter(anno => anno.id !== del_anno.id)))
                    this.setState({ annotations: annotations.filter(anno => anno.id !== del_anno.id) })
                }

            })
        }
    }
    render() {
        return (
            <>
                <div className="left-bar">
                    <div className="mb-3">
                        <label htmlFor="project_name" className="form-label">Titre</label>
                        <input type="text" id="project_name" className="form-control" placeholder="Donnez un titre à votre projet" value={this.state.selected_project.title} onChange={(e) => this.updateProjectName(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="project_desc" className="form-label">Description</label>
                        <input id="project_desc" className="form-control" type="text" placeholder="Description de votre projet" value={this.state.selected_project.description} onChange={(e) => this.updateProjectDesc(e)} />
                    </div>

                    <span className="autosave-text">* Le titre et la description sont sauvegardés automatiquement</span>

                    {
                        this.state.annotations && this.state.annotations.length > 0 ?
                            <AnnotationCards annotations={this.state.annotations} updateAnnos={(updated_annos) => this.setState({ annotations: updated_annos })} />
                            : <></>
                    }
                </div>

                <div className="right-bar">

                    <button className="btn btn-primary back-home-editor" onClick={() => this.props.history.push("/")}> <FontAwesomeIcon icon={faArrowLeft} /> Retour à l'accueil</button>


                    <div className="col picture-div">
                        <div className="card mb-3">
                            <div className="card">
                                <div className="card-body project-body">


                                    <div className="project-body-left">
                                        <div id="toolbar-container"></div>
                                        <h5 id="project_name" className="card-title"></h5>
                                        <p id="project_desc" className="card-text"></p>
                                    </div>

                                    <div className="project-body-right">
                                        <a id={"download_btn_" + this.state.selected_project.id} href={createExportProjectJsonFile(this.state.selected_project.id)} download={this.state.selected_project.title + ".json"} className="btn btn-secondary btn-sm"> <FontAwesomeIcon icon={faDownload} /> Télécharger </a>
                                        <button id="preview" className="btn btn-primary subbutton" onClick={() => this.props.history.push("/project/" + this.props.match.params.id)}>Preview</button>
                                    </div>

                                </div>




                                {
                                    this.state.annotations.length >= 1 ?
                                        <div className="adno-editor-annotations">
                                            <div id="openseadragon1"></div>
                                        </div>
                                        :
                                        <div className="adno-editor">
                                            <div id="openseadragon1"></div>
                                        </div>
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(Editor)