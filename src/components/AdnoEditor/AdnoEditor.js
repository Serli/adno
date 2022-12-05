import { Component } from "react";
import { withRouter } from "react-router";

// Import FontAwesome and icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload, faEye } from "@fortawesome/free-solid-svg-icons";

// Import utils
import { checkIfProjectExists, createDate, createExportProjectJsonFile, generateUUID, insertInLS } from "../../../Utils/utils";

// Import CSS
import "./AdnoEditor.css";

class AdnoEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileMode: false,
            selected_project: JSON.parse(localStorage.getItem(this.props.match.params.id)),
            annotations: JSON.parse(localStorage.getItem(`${this.props.match.params.id}_annotations`))
        }
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
            disableEditor: true
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

            // Find annotations from the localStorage in JSON format
            var annos = localStorage.getItem(`${selected_project.id}_annotations`)

            // Generate dataURI and load annotations into Annotorious
            const dataURI = "data:application/json;base64," + btoa(unescape(encodeURIComponent(annos)));
            anno.loadAnnotations(dataURI)


            Annotorious.SelectorPack(anno);
            Annotorious.BetterPolygon(anno);
            Annotorious.Toolbar(anno, document.getElementById('toolbar-container'));

            //Manage creation of new annotation
            anno.on('createSelection', (annotation) => {

                console.log("createSelection", annotation);

                var annotations = JSON.parse(localStorage.getItem(`${selected_project.id}_annotations`))

                // reorganize properties 
                const newAnnotation = {
                    "@context": "http://www.w3.org/ns/anno.jsonld",
                    "id": generateUUID(),
                    "type": annotation.type,
                    "body": [],
                    "target": annotation.target,
                    "modified": createDate(),
                    "created": createDate(),
                }

                if (!annotations) {
                    annotations = [
                        newAnnotation
                    ]
                } else {
                    annotations.push(newAnnotation)
                }

                // Update the last update date for the selected project
                selected_project.last_update = createDate()
                insertInLS(selected_project.id, JSON.stringify(selected_project))

                // Update annotations linked to the selected project in the localStorage
                insertInLS(`${selected_project.id}_annotations`, JSON.stringify(annotations))

                this.props.updateAnnos(annotations)

                this.props.closeNav()
                this.props.openRichEditor(newAnnotation)

                anno.saveSelected();


            });


            // Manage update of annotation
            // anno.on('updateAnnotation', (upated_anno) => {


            //     let annotations = JSON.parse(localStorage.getItem(`${selected_project.id}_annotations`))

            //     let selected_anno = annotations.filter(anno => anno.id === upated_anno.id)[0]

            //     Object.assign(selected_anno, upated_anno);

            //     // Update the last update in the project
            //     selected_project.last_update = new Date()
            //     insertInLS(selected_project.id, JSON.stringify(selected_project))

            //     // Save the updated annotation in the localStorage
            //     insertInLS(`${selected_project.id}_annotations`, JSON.stringify(annotations))

            //     this.setState({ annotations })
            // });

            // anno.on('deleteAnnotation', (del_anno) => {
            //     let annotations = JSON.parse(localStorage.getItem(`${selected_project.id}_annotations`))

            //     if (annotations && annotations.length === 1) {
            //         localStorage.removeItem(`${selected_project.id}_annotations`)
            //         this.setState({ annotations: annotations.filter(anno => anno.id !== del_anno.id) })
            //     } else {
            //         // Delete the annotation in the localStorage
            //         insertInLS(`${selected_project.id}_annotations`, JSON.stringify(annotations.filter(anno => anno.id !== del_anno.id)))
            //         this.setState({ annotations: annotations.filter(anno => anno.id !== del_anno.id) })
            //     }

            // })


            anno.on('selectAnnotation', (annotation) => {
                this.props.closeNav()
                this.props.openRichEditor(annotation)
            })
        }
    }
    render() {
        return (
            <div>
                <div id="toolbar-container"></div>

                {
                    this.state.annotations && this.state.annotations.length >= 1 ?
                        <div className="adno-editor-annotations">
                            <div id="openseadragon1"></div>
                        </div>
                        :
                        <div className="adno-editor">
                            <div id="openseadragon1"></div>
                        </div>
                }



            </div>
        )
    }
}

export default withRouter(AdnoEditor)