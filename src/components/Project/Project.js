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
import "./Project.css";
import AdnoViewer from "../AdnoViewer/AdnoViewer";
import AdnoEditor from "../AdnoEditor/AdnoEditor";
import SidebarAnnotations from "../SidebarAnnotations/SidebarAnnotations";

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annotations: [],
            selectedProject: {},
            editingMode: false,
            sidebarOpened: false
        }
    }


    openNav() {
        document.getElementById("mySidebar").style.width = "350px";
        document.getElementById("adno-viewer").style.marginLeft = "350px";
        document.getElementById("right-card").style.width =  "75%"
    }

    closeNav() {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("adno-viewer").style.marginLeft = "0";
        document.getElementById("right-card").style.width =  "100%"
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


    // Function to update the description of the selected project
    updateProjectAutor(e) {

        let project = this.state.selected_project

        project.autor = e.target.value
        project.last_update = new Date()

        this.setState({ selected_project: project })

        insertInLS(project.id, JSON.stringify(project))
    }

    render() {
        return (
            <div className="adno-viewer" id="adno-viewer">


                <SidebarAnnotations
                    closeNav={() => {
                        this.setState({ sidebarOpened: false })
                        this.closeNav()
                    }
                    }
                    editingMode={this.state.editingMode} annotations={this.state.annotations} updateAnnos={(updated_annos) => this.setState({ annotations: updated_annos })} />



                {
                    !this.state.sidebarOpened &&
                    <button class="openbtn" onClick={() => {
                        this.setState({ sidebarOpened: true })
                        this.openNav()
                    }}>☰</button>

                }



                <button className="btn btn-primary back-home-viewer" onClick={() => this.props.history.push("/")}> <FontAwesomeIcon icon={faArrowLeft} /> Retour à l'accueil</button>

                {/* <input type="text" disabled={!this.state.editingMode} value={checkIfProjectExists(this.props.match.params.id) && this.state.selectedProject.title} />   <input type="text" disabled={!this.state.editingMode} value={checkIfProjectExists(this.props.match.params.id) && this.state.selectedProject.description} />


                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"> <FontAwesomeIcon icon={faBook} /> Description</span>
                    <input type="text" id="adno_image_url_2" className="form-control" value={this.state.adno_image_url} onChange={(e) => this.setState({ adno_image_url: e.target.value })}
                        placeholder="Renseignez ici votre fichier info.json ou votre image jpg/png" />
                </div> */}


                {/* {

                    this.state.editingMode ?

                        this.state.annotations && this.state.annotations.length > 0 &&
                        <div className="adno-viewer-leftbar">

                            <AnnotationCards annotations={this.state.annotations} updateAnnos={(updated_annos) => this.setState({ annotations: updated_annos })} />
                        </div>
                        :

                        // Display every annotation
                        this.state.annotations && this.state.annotations.length > 0 &&
                        <div className="adno-viewer-leftbar">
                            <ViewerAnnotationCards editingMode={this.state.editingMode} annotations={this.state.annotations} />
                        </div>
                } */}

                <div className="adno-viewer-rightbar-without-annos">
                    <div className="col">
                        <div id="right-card" className="card mb-3">
                            <div className="card">
                                <div className="card-body project-body">


                                    <div className="project-body-left">
                                        <h5 id="project_name" className="card-title">{checkIfProjectExists(this.props.match.params.id) && this.state.selectedProject.title}</h5>
                                        <p id="project_desc" className="card-text">{checkIfProjectExists(this.props.match.params.id) && this.state.selectedProject.description}</p>
                                    </div>






                                    {
                                        process.env.ADNO_MODE === "FULL" &&
                                        <div className="editing-container">
                                            <p>Editing mode</p>
                                            <label className="switch">
                                                <input type="checkbox" value={this.state.editingMode} onClick={() => this.setState({ editingMode: !this.state.editingMode })} />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    }


                                </div>


                                {
                                    this.state.editingMode ?
                                        <AdnoEditor updateAnnos={(annos) => this.setState({ annotations: annos })} />
                                        :
                                        <AdnoViewer updateAnnos={(annos) => this.setState({ annotations: annos })} />
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Project)