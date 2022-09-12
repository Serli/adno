import { Component } from "react";
import { withRouter } from "react-router";

// Import utils
import { checkIfProjectExists, insertInLS } from "../../../Utils/utils";

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
            annotations : JSON.parse(localStorage.getItem(`${this.props.match.params.id}_annotations`))
        }
    }

    updateProjectName(e){

        let project = this.state.selected_project

        project.title = e.target.value
        project.last_update = new Date()

        this.setState({selected_project: project})

        insertInLS(project.id, JSON.stringify(project))
    }

    updateProjectDesc(e){

        let project = this.state.selected_project

        project.description = e.target.value
        project.last_update = new Date()

        this.setState({selected_project: project})

        insertInLS(project.id, JSON.stringify(project))
    }

    componentDidMount() {

        // First of all, verify if the UUID match to an real project in the localStorage
        // If not, then redirect the user to the HomePage
        if (!this.props.match.params.id || !checkIfProjectExists(this.props.match.params.id)) {
            this.props.history.push("/")
        } else {
            let selected_project = JSON.parse(localStorage.getItem(this.props.match.params.id))

            if (JSON.parse(localStorage.getItem(this.props.match.params.id)).manifest_url) {
                var viewer = OpenSeadragon({
                    id: 'openseadragon1',
                    tileSources: [JSON.parse(localStorage.getItem(this.props.match.params.id)).manifest_url],
                    prefixUrl: 'https://openseadragon.github.io/openseadragon/images/'
                });
            } else {
                var viewer = OpenSeadragon({
                    id: 'openseadragon1',
                    tileSources: {
                        type: 'image',
                        url: JSON.parse(localStorage.getItem(this.props.match.params.id)).img_url
                    },
                    prefixUrl: 'https://openseadragon.github.io/openseadragon/images/'
                });
            }

            var anno = OpenSeadragon.Annotorious(viewer, {
                locale: 'auto',
                drawOnSingleClick: true,
                allowEmpty: true,
                disableEditor: false
            });

            // Find annotations from the localStorage in JSON format
            var annotations = selected_project.id + "_annotations"
            var annos = localStorage.getItem(annotations)

            // Generate dataURI and load annotations into Annotorious
            const dataURI = "data:application/json;base64," + btoa(unescape(encodeURIComponent(annos)));
            anno.loadAnnotations(dataURI)


            Annotorious.SelectorPack(anno);
            Annotorious.BetterPolygon(anno);
            Annotorious.Toolbar(anno, document.getElementById('toolbar-container'));



            // Manage creation of new annotation
            anno.on('createAnnotation', function (annotation) {
                var project_annotations_id = selected_project.id + "_annotations";

                var annotations = JSON.parse(localStorage.getItem(project_annotations_id))

                if (annotations === undefined || annotations === null) {
                    annotations = [
                        annotation
                    ]
                } else {
                    annotations.push(annotation)
                }

                // Update the last update date for the selected project
                selected_project.last_update = new Date()
                insertInLS(selected_project.id, JSON.stringify(selected_project))

                // Update annotations linked to the selected project in the localStorage
                insertInLS(project_annotations_id, JSON.stringify(annotations))

                window.location.reload()

            });

            // Manage update of annotation
            anno.on('updateAnnotation', function (upated_anno) {
                let annotations = JSON.parse(localStorage.getItem(selected_project.id + "_annotations"))

                let selected_anno = annotations.filter(anno => anno.id === upated_anno.id)[0]

                Object.assign(selected_anno, upated_anno);

                // Update the last update in the project
                selected_project.last_update = new Date()
                insertInLS(selected_project.id, JSON.stringify(selected_project))

                // Save the updated annotation in the localStorage
                insertInLS(selected_project.id + "_annotations", JSON.stringify(annotations))

                window.location.reload()
            });

            anno.on('deleteAnnotation', function (del_anno) {
                var annotations = JSON.parse(localStorage.getItem(selected_project.id + "_annotations"))


                if (annotations && annotations.length === 1) {
                    localStorage.removeItem(selected_project.id + "_annotations")
                    window.location.reload()
                } else {
                    // Delete the annotation in the localStorage
                    insertInLS(`${selected_project.id}_annotations`, JSON.stringify(annotations.filter(anno => anno.id !== del_anno.id)))
                    window.location.reload()
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
                        <input type="text" id="project_name" className="form-control" placeholder="Donnez un titre à votre projet" value={this.state.selected_project.title} onChange={(e) => this.updateProjectName(e)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="project_desc" className="form-label">Description</label>
                        <input id="project_desc" className="form-control" type="text" placeholder="Description de votre projet" value={this.state.selected_project.description} onChange={(e) => this.updateProjectDesc(e)}/>
                    </div>

                    <span className="autosave-text">* Le titre et la description sont sauvegardés automatiquement</span>

                    {
                        this.state.annotations && this.state.annotations.length > 0 ?
                            <AnnotationCards annotations={this.state.annotations} />
                        : <></>
                    }
                </div>

                <div className="right-bar">
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
                                        <button id="preview" className="btn btn-primary subbutton" onClick={() => this.props.history.push("/project/" + this.props.match.params.id)}>Preview</button>
                                    </div>

                                </div>

                                <div className="adno-editor">
                                    <div id="openseadragon1" style={{ "width": "1200px", "height": "550px" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(Editor)