import { Component } from "react";
import { Link, withRouter } from "react-router-dom";

// Import FontAwesome and icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload, faHome } from "@fortawesome/free-solid-svg-icons";

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
        document.getElementById("adno-project-view").style.marginLeft = "350px";
        document.getElementById("right-card").style.width = "75%"
    }

    closeNav() {
        document.getElementById("adno-project-view").style.marginLeft = "0";
        document.getElementById("right-card").style.width = "100%"
    }

    componentDidMount() {

        if (!checkIfProjectExists(this.props.match.params.id)) {
            this.props.history.push("/")
        }
        // Find annotations from the localStorage in JSON format

        var annos = JSON.parse(localStorage.getItem(`${this.props.match.params.id}_annotations`)) || []
        var actualProj = JSON.parse(localStorage.getItem(this.props.match.params.id))

        // Save to local state the project and annotations if founded
        this.setState({ annotations: annos, selectedProject: actualProj })
    }

    render() {
        return (
            <div className="adno-project-view" id="adno-project-view">


                {
                    this.state.updateAnnotation &&
                    <div className="text-rich">
                        <AdnoRichText updateAnnos={(annos) => this.setState({ annotations: annos })} closeRichEditor={() => this.setState({ updateAnnotation: false })} selectedAnnotation={this.state.selectedAnnotation} selectedProjectId={this.props.match.params.id} annotations={this.state.annotations} />
                    </div>
                }



                <SidebarAnnotations
                    sidebarStatus={this.state.sidebarOpened}
                    closeNav={() => {
                        this.setState({ sidebarOpened: false })
                        this.closeNav()
                    }
                    }
                    openRichEditor={(annotation) => this.setState({ updateAnnotation: true, selectedAnnotation: annotation })}
                    editingMode={this.state.editingMode} annotations={this.state.annotations} updateAnnos={(updated_annos) => this.setState({ annotations: updated_annos })}
                    selectedProject={this.state.selectedProject}
                    updateProject={(updatedProject) => this.setState({ selectedProject: updatedProject })}
                />

                <div className="navbar bg-neutral text-neutral-content">


                    <label className="btn btn-circle swap swap-rotate">

                        <input type="checkbox" checked={this.state.sidebarOpened}
                            onClick={() => {
                                if(this.state.sidebarOpened){
                                    this.setState({ sidebarOpened: false })
                                    this.closeNav()
                                }else{
                                    this.setState({ sidebarOpened: true })
                                    this.openNav()
                                }
                               
                            }} />

                        <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>

                        <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>

                    </label>

                    <Link to={"/"} className="btn btn-ghost normal-case text-xl">Adno</Link>

                    {
                        process.env.ADNO_MODE === "FULL" &&
                        <div className="dl_toggle">
                            {
                                this.state.selectedProject.id &&
                                <a id={"download_btn_" + this.state.selectedProject.id} href={createExportProjectJsonFile(this.state.selectedProject.id)} download={this.state.selectedProject.title + ".json"} className="btn btn-md dl-btn"> <FontAwesomeIcon icon={faDownload} /> </a>
                            }
                            <label className="cursor-pointer label label-toggle">
                                <label>Mode édition</label>
                                <input type="checkbox" className="toggle toggle-lg toggle-success" value={this.state.editingMode}
                                    onClick={() => {

                                        if (!this.state.sidebarOpened && !this.state.editingMode) {
                                            this.setState({ sidebarOpened: true })
                                            this.openNav()
                                        }

                                        this.setState({ editingMode: !this.state.editingMode })
                                    }}
                                    checked={this.state.editingMode} />
                            </label>


                        </div>
                    }

                </div>


                <div className="adno-viewer-rightbar-without-annos">
                    <div className="col">
                        <div id="right-card">
                            <div className="card">

                                {/* {
                                    !process.env.ADNO_MODE === "FULL" || !this.state.editingMode &&
                                    <div className="project-body-left">
                                        {this.state.selectedProject.title && <p id="project_title" className="card-text">Titre : {this.state.selectedProject.title}</p>}
                                        {this.state.selectedProject.description && <p id="project_desc" className="card-text">Description : {this.state.selectedProject.description}</p>}
                                        {this.state.selectedProject.editor && <p id="project_editor" className="card-text">Editeur : {this.state.selectedProject.editor}</p>}
                                        {this.state.selectedProject.autor && <p id="project_autor" className="card-text">Auteur :{this.state.selectedProject.autor}</p>}
                                    </div>
                                } */}


                                {
                                    !this.state.updateAnnotation
                                        && this.state.editingMode ?
                                        <AdnoEditor updateAnnos={(annos) => this.setState({ annotations: annos })} openRichEditor={(annotation) => this.setState({ updateAnnotation: true, selectedAnnotation: annotation })} closeNav={() => {
                                            this.setState({ sidebarOpened: false })
                                            this.closeNav()
                                        }} />
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