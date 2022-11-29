import { Component } from "react";
import { withRouter } from "react-router-dom";

// Import FontAwesome and icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";

// Import utils
import { checkIfProjectExists, createDate, createExportProjectJsonFile, insertInLS } from "../../../Utils/utils";

// Import libraries
import "../../libraries/annona-reworked/js/storyboard";
import "../../libraries/openseadragon/openseadragon.min.js";

// Imports CSS
import "./Project.css";
import AdnoViewer from "../AdnoViewer/AdnoViewer";
import AdnoEditor from "../AdnoEditor/AdnoEditor";
import SidebarAnnotations from "../SidebarAnnotations/SidebarAnnotations";
import AdnoRichText from "../AdnoRichText/AdnoRichText";

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annotations: [],
            selectedProject: {},
            editingMode: false,
            sidebarOpened: false,
            updateAnnotation: false,
            selectedAnnotation: {}
        }
    }


    openNav() {
        document.getElementById("mySidebar").style.width = "350px";
        document.getElementById("adno-viewer").style.marginLeft = "350px";
        document.getElementById("right-card").style.width = "75%"
    }

    closeNav() {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("adno-viewer").style.marginLeft = "0";
        document.getElementById("right-card").style.width = "100%"
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


    // Update project values
    updateProjectTitle(newTitle) {
        this.setState({ selectedProject: { ...this.state.selectedProject, "title": newTitle } })
        insertInLS(this.state.selectedProject.id, JSON.stringify({ ...this.state.selectedProject, "title": newTitle, "modified": createDate() }))
    }

    updateProjectDesc(newDesc) {
        this.setState({ selectedProject: { ...this.state.selectedProject, "description": newDesc } })
        insertInLS(this.state.selectedProject.id, JSON.stringify({ ...this.state.selectedProject, "description": newDesc, "modified": createDate() }))
    }

    updateProjectAutor(newAutor) {
        this.setState({ selectedProject: { ...this.state.selectedProject, "autor": newAutor } })
        insertInLS(this.state.selectedProject.id, JSON.stringify({ ...this.state.selectedProject, "autor": newAutor, "modified": createDate() }))
    }

    updateProjectEditor(newEditor) {
        this.setState({ selectedProject: { ...this.state.selectedProject, "editor": newEditor } })
        insertInLS(this.state.selectedProject.id, JSON.stringify({ ...this.state.selectedProject, "editor": newEditor, "modified": createDate() }))
    }

    render() {
        return (
            <div className="adno-viewer" id="adno-viewer">


                {
                    this.state.updateAnnotation &&
                    <div className="text-rich">
                        <div className="text-rich-content">
                            {/* <p>Anno content...</p> */}
                            <AdnoRichText updateAnnos={(annos) => this.setState({ annotations: annos })} closeRichEditor={() => this.setState({ updateAnnotation: false })} selectedAnnotation={this.state.selectedAnnotation} selectedProjectId={this.props.match.params.id} annotations={this.state.annotations} />
                        </div>
                    </div>
                }



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


                <div className="adno-viewer-rightbar-without-annos">
                    <div className="col">
                        <div id="right-card" className="card mb-3">
                            <div className="card">
                                <div className="card-body project-body">



                                    {
                                        !process.env.ADNO_MODE === "FULL" || !this.state.editingMode &&
                                        <div className="project-body-left">
                                            <h5 id="project_name" className="card-title">{checkIfProjectExists(this.props.match.params.id) && this.state.selectedProject.title}</h5>
                                            <p id="project_desc" className="card-text">{checkIfProjectExists(this.props.match.params.id) && this.state.selectedProject.description}</p>
                                        </div>
                                    }



                                    {
                                        process.env.ADNO_MODE === "FULL" && this.state.editingMode &&
                                        <div className="project-body-left">                                            <label>Intitulé du projet</label>
                                            <input type="text" value={this.state.selectedProject.title} onChange={(e) => this.updateProjectTitle(e.target.value)} placeholder="Titre" />

                                            <label>Description du projet</label>
                                            <input type="text" value={this.state.selectedProject.description} onChange={(e) => this.updateProjectDesc(e.target.value)} placeholder="Description" />

                                            <label>Editeur du projet</label>
                                            <input type="text" value={this.state.selectedProject.editor} onChange={(e) => this.updateProjectEditor(e.target.value)} placeholder="Editeur" />

                                            <label>Auteur du projet</label>
                                            <input type="text" value={this.state.selectedProject.autor} onChange={(e) => this.updateProjectAutor(e.target.value)} placeholder="Auteur" />
                                        </div>
                                    }




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

                                    {
                                        this.state.selectedProject.id &&
                                        <a id={"download_btn_" + this.state.selectedProject.id} href={createExportProjectJsonFile(this.state.selectedProject.id)} download={this.state.selectedProject.title + ".json"} className="btn btn-secondary btn-sm"> <FontAwesomeIcon icon={faDownload} /> Télécharger </a>
                                    }



                                </div>


                                {
                                    !this.state.updateAnnotation
                                        && this.state.editingMode ?
                                        <AdnoEditor updateAnnos={(annos) => this.setState({ annotations: annos })} openRichEditor={(annotation) => this.setState({ updateAnnotation: true, selectedAnnotation: annotation })} />
                                        : !this.state.updateAnnotation &&
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