import { Component } from "react";
import { withRouter } from "react-router";

// Import FontAwesome icons
import { faDownload, faMagnifyingGlass, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import popup alerts
import Swal from 'sweetalert2';

// Import utils
import { insertInLS } from "../../../Utils/utils";

// Import CSS
import "./ProjectView.css";

class ProjectView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nbAnnotations: 0,
            imgSource: "",
            imgWidth: 0
        }
    }

    componentDidMount() {
        if (this.props.project.manifest_url) {
            fetch(this.props.project.manifest_url)
                .then(rep => rep.json())
                .then(manifest => {
                    if (manifest["@id"] && manifest["sizes"] && manifest["sizes"].length > 0) {

                        let manifestHeight = manifest["sizes"].sort((a, b) => b.width - a.width)[0].height
                        var manifestWidth = manifest["sizes"].sort((a, b) => b.width - a.width)[0].width

                        this.setState({ imgWidth: manifest["sizes"].sort((a, b) => b.width - a.width)[0].width })
                        this.setState({ imgSource: manifest["@id"] + "/full/" + manifestWidth + "," + manifestHeight + "/0/default.jpg" })

                    } else if (manifest["@id"] && manifest["tiles"] && manifest["tiles"][0]) {
                        this.setState({ imgWidth: manifest["tiles"][0].width })
                        this.setState({ imgSource: manifest["@id"] + "/full/" + manifest["tiles"][0].width + ",/0/default.jpg" })
                    } else if (manifest["id"] && manifest["tiles"]) {
                        this.setState({ imgWidth: manifest["tiles"][0].width })
                        this.setState({ imgSource: manifest["id"] + "/full/" + manifest["tiles"][0].width + ",/0/default.jpg" })
                    } else if (manifest["@id"] && manifest["@context"] && manifest["@context"] === "http://library.stanford.edu/iiif/image-api/1.1/context.json") {
                        this.setState({ imgWidth: 250 })
                        this.setState({ imgSource: manifest["@id"] + "/full/,250/0/native.jpg" })
                    } else if (this.props.project.manifest_url.indexOf("info.json") !== -1) {
                        this.setState({ imgWidth: 250 })
                        this.setState({ imgSource: this.props.project.manifest_url.replace("info.json", "") + "/full/,250/0/native.jpg" })
                    }
                    else if (manifest["@id"] && !manifest["tiles"]) {
                        this.setState({ imgWidth: 250 })
                        this.setState({ imgSource: manifest["@id"] + "/full/,250/0/native.jpg" })
                    }

                    if (localStorage.getItem(this.props.project.id + "_annotations")) {
                        let nbAnnotations = JSON.parse(localStorage.getItem(this.props.project.id + "_annotations")).length
                        this.setState({ nbAnnotations })
                    }
                })
        } else if (this.props.project.img_url) {
            this.setState({ imgSource: this.props.project.img_url })

            if (localStorage.getItem(this.props.project.id + "_annotations")) {
                let nbAnnotations = JSON.parse(localStorage.getItem(this.props.project.id + "_annotations")).length
                this.setState({ nbAnnotations })
            }

        }


    }

    render() {
        function deleteProject(idProject) {

            // First, remove all the annotations linked to the selected projet
            localStorage.removeItem(idProject + "_annotations")

            // Then , delete the projet 
            localStorage.removeItem(idProject)

            // Finaly, remove the project id from the adno projects list
            let projects = JSON.parse(localStorage.getItem("adno_projects"))

            let newProjectsList = projects.filter(id_p => id_p !== idProject)

            insertInLS("adno_projects", JSON.stringify(newProjectsList))
        }

        function downloadProjectWithAnnotations(projectID) {

            // Get project from localStorage
            var project = JSON.parse(localStorage.getItem(projectID))

            // Then, get all annotations
            var annotations = JSON.parse(localStorage.getItem(projectID + "_annotations"))


            var finalProject = {
                "project": project,
                "annotations": annotations
            }

            return URL.createObjectURL(new Blob([JSON.stringify(finalProject)], { type: "text/plain" }));
        }

        function deleteProj(projID) {
            Swal.fire({
                title: 'Voulez-vous vraiment supprimer ce projet ?',
                showCancelButton: true,
                confirmButtonText: 'Supprimer mon projet',
                cancelButtonText: 'Annuler',
                icon: 'warning',
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteProject(projID)
                    Swal.fire('La liste des projets a bien été mise à jour !', '', 'success')
                        .then((result) => {
                            result.isConfirmed ? window.location.reload() : ""
                        })
                }
            })
        }

        return (
            <div className="card mb-3 project-card">
                <div className="row g-0">
                    <div className="col-md-4 card-img-adno">
                        <img src={this.state.imgSource} className="img-fluid img-proj-view " alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{this.props.project.title}</h5>
                            <p className="card-text">{this.props.project.description ? this.props.project.description : "Aucune description disponible pour ce projet"}</p>
                            <p className="card-text"><small className="text-muted">Créé le {this.props.project.creation_date}</small></p>
                            <p className="card-text"><small className="text-muted">Dernière mise à jour : {this.props.project.last_update}</small></p>
                            <p className="card-text"><small className="text-muted"> <span className="label-nb-annos">{this.state.nbAnnotations}</span>  annotation(s)</small></p>

                            <div className="buttons-group-proj-view">
                                <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteProj(this.props.project.id)}>    <FontAwesomeIcon icon={faTrash} /> Supprimer  </button>
                                <button type="button" className="btn btn-success btn-sm" onClick={() => this.props.history.push("/edit/" + this.props.project.id)}> <FontAwesomeIcon icon={faPenToSquare} />  Editer</button>
                                <button type="button" className="btn btn-primary btn-sm" onClick={() => this.props.history.push("/project/" + this.props.project.id)}> <FontAwesomeIcon icon={faMagnifyingGlass} />  Prévisualiser  </button>
                                <a id={"download_btn_" + this.props.project.id} href={downloadProjectWithAnnotations(this.props.project.id)} download={this.props.project.title + ".json"} className="btn btn-secondary btn-sm"> <FontAwesomeIcon icon={faDownload} /> Télécharger  </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ProjectView)