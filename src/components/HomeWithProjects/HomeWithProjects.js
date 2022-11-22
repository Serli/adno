import { Component } from "react";
import { withRouter } from "react-router";

// Import FontAwesome and icons
import { faAdd, faBook, faLink, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import popup alerts
import Swal from "sweetalert2";

// Import utils
import { insertInLS, isValidUrl } from "../../../Utils/utils";

// Import components
import ImportProject from "../ImportProject/ImportProject";
import ProjectsList from "../ProjectsList/ProjectsList";

// Import CSS
import "./HomeWithProjects.css";

class HomeWithProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adno_image_url: "",
            projects: []
        }
    }

    componentDidMount() {
        // Get projects from localStorage
        var projects = []
        var allProjectsID = JSON.parse(localStorage.getItem("adno_projects"))
        allProjectsID.map(projectID => {
            projects.push(JSON.parse(localStorage.getItem(projectID)))
        })

        this.setState({ projects })
    }

    render() {
        // Create function which is called when clicking on the submit button
        const newProject = (e) => {
            e.preventDefault()

            // Also, we check if the url is not empty, not undefined and not null
            if (this.state.adno_image_url) {

                // Then, we check if the given URL is valid
                // Finally, we check if the URL is reachable
                if (isValidUrl(this.state.adno_image_url)) {

                    fetch(this.state.adno_image_url)
                        .then(rep => {
                            if (rep.status === 200 || rep.status === 302) {
                                insertInLS("adno_image_url", this.state.adno_image_url)

                                this.props.history.push("/new");
                            } else {
                                throw new Error(rep.status)
                            }
                        })
                        .catch(error => {
                            Swal.fire({
                                title: `Erreur - Manifest ou image introuvable`,
                                showCancelButton: true,
                                showConfirmButton: false,
                                cancelButtonText: 'OK',
                                icon: 'warning',
                            })
                        })
                } else {
                    Swal.fire({
                        title: "L'URL renseignée n'est pas valide !",
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonText: 'OK',
                        icon: 'warning',
                    })
                }

            } else {
                // Display a warning popup if the URL is not filled
                Swal.fire({
                    title: 'Veuillez renseigner une URL valide',
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonText: 'OK',
                    icon: 'warning',
                })
            }
        }

        // Function to remove all projects in the localStorage
        const deleteAllProjects = () => {
            Swal.fire({
                title: 'Êtes-vous sûr de vouloir supprimer tous vos projets ?',
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: 'Annuler',
                confirmButtonText: 'Oui, supprimer mes projets',
                icon: 'warning',
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        JSON.parse(localStorage.getItem("adno_projects")).forEach(project => {
                            localStorage.removeItem(project)
                            localStorage.removeItem(project + "_annotations")
                        });

                        localStorage.removeItem("adno_projects")

                        Swal.fire({
                            title: 'Vos projets ont été supprimés avec succès !',
                            showCancelButton: false,
                            showConfirmButton: true,
                            cancelButtonText: 'OK',
                            icon: 'success',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload()
                            }
                        })

                    }
                })
        }

        return (
            <div id="container_with_projects" className="adno_container">
                <div className="with_projects">
                    <div className="with_projects_left">

                        <div className="jumbotron mt-3">
                            <h1>ADNO</h1>
                            <p className="lead">Adno est une application web de visualisation, d’édition et de partage pair-à-pair de narrations et de parcours sur des images IIIF.</p>
                        </div>

                        {
                            process.env.ADNO_MODE === "FULL" ?
                                <form id="myForm">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1"> <FontAwesomeIcon icon={faLink} /> URL</span>
                                        <input type="text" id="adno_image_url_2" className="form-control" value={this.state.adno_image_url} onChange={(e) => this.setState({ adno_image_url: e.target.value })}
                                            placeholder="Renseignez ici votre fichier info.json ou votre image jpg/png" />
                                    </div>


                                    <button id="create_project_2" type="submit" className="btn btn-success" onClick={(e) => newProject(e)}> <FontAwesomeIcon icon={faAdd} /> Créer un nouveau projet</button>

                                </form>

                                : <></>

                        }

                        {
                            process.env.ADNO_MODE === "FULL" ?
                                <button className="btn btn-primary btn-sh-examples" onClick={() => this.props.history.push("/example")}> <FontAwesomeIcon icon={faBook} /> Voir les Exemples</button>

                                : <></>
                        }

                    </div>

                    <div className="with_projects_right">

                        <ImportProject projects={this.state.projects} updateProjects={(updatedList) => this.setState({ projects: updatedList, adno_image_url: "" })} />

                        <div className="homewpbar">
                            <h2>Vos Projets</h2>
                            <button className="btn btn-danger" onClick={() => deleteAllProjects()}> <FontAwesomeIcon icon={faTrashAlt} /> Supprimer mes projets</button>
                        </div>

                        {
                            this.state.projects && this.state.projects.length > 0 ?
                                <ProjectsList projects={this.state.projects} />
                                : <></>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(HomeWithProjects);