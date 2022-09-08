import { Component } from "react";
import { withRouter } from "react-router";

// Import utils
import { generateUUID } from "../../../Utils/UUID"
import { insertInLS, buildJsonProjectWithImg, buildJsonProjectWithManifest, get_url_extension } from "../../../Utils/utils";

// Import popup alerts
import Swal from "sweetalert2";

// Import CSS
import "./NewProject.css"

class NewProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    render() {
        async function isManifest(url) {
            return new Promise((resolve, reject) => {
                fetch(url)
                    .then(res => {
                        if (res.status == 200 || res.status == 201) {
                            return res.text()
                        } else {
                            reject(res.status)
                        }
                    })
                    .then((data) => {
                        return resolve(data ? JSON.parse(data) : {})
                    })
                    .catch(reject)
            })

        }


        const createProj = async (e) => {
            e.preventDefault()

            if (document.getElementById("project_name").value === "") {
                Swal.fire({
                    title: "Veuillez renseigner un titre à votre projet",
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonText: 'OK',
                    icon: 'warning',
                })
            } else {
                this.setState({ isLoading: true })

                var manifest_url = localStorage.getItem("adno_image_url")

                let isUrlManifest = "";

                // if the url is not an image file (.jpg, .jpeg or .png) it should be a manifest
                if (get_url_extension(manifest_url) !== "png" && get_url_extension(manifest_url) !== "jpg" && get_url_extension(manifest_url) !== "jpeg") {
                    isUrlManifest = await isManifest(manifest_url)
                }

                var projectID = generateUUID()

                // we check if the url is an image (.jpg, .jpeg or .png) or a manifest or a json file (such as an info.json file)
                if (get_url_extension(manifest_url) === "png" || get_url_extension(manifest_url) === "jpg" || get_url_extension(manifest_url) === "jpeg" || get_url_extension(manifest_url) === "json" || isUrlManifest["@type"] && isUrlManifest["@type"] === "sc:Manifest") {
                    // fichier accepté

                    if (get_url_extension(manifest_url) === "png" || get_url_extension(manifest_url) === "jpg" || get_url_extension(manifest_url) === "jpeg") {

                        let project = buildJsonProjectWithImg(projectID, document.getElementById("project_name").value,   document.getElementById("project_desc").value,  new Date(),new Date(),manifest_url)



                        if (localStorage.getItem("adno_projects") === undefined || localStorage.getItem("adno_projects") === null) {

                            // If projects in local storage don't exist create the array
                            var projects = []
                            projects.push(projectID)

                            // Création du projet dans le localStorage
                            insertInLS(projectID, JSON.stringify(project))

                            // Insertion de l'ID du projet créé dans le tableau des projets
                            insertInLS("adno_projects", JSON.stringify(projects))
                        } else {

                            // Création du projet dans le localStorage
                            insertInLS(projectID, JSON.stringify(project))

                            // Insertion de l'ID du projet créé dans le tableau des projets
                            projects = JSON.parse(localStorage.getItem("adno_projects"))
                            projects.push(projectID)
                            insertInLS("adno_projects", JSON.stringify(projects))
                        }

                        localStorage.removeItem("adno_image_url")
                        this.props.history.push("/project/" + projectID)
                    } else {
                        fetch(manifest_url)
                            .then(rep => {
                                if (rep.status === 200) {

                                    rep.json().then(manifest => {
                                        let project;

                                        if (manifest["@type"] && manifest["@type"] === "sc:Manifest") {
                                            // type manifest

                                            if (manifest.sequences[0].canvases && manifest.sequences[0].canvases.length > 0) {
                                                var resultLink = manifest.sequences[0].canvases[0].images[0].resource.service["@id"] + "/info.json"
                                            } else if (manifest.logo["@id"]) {
                                                var resultLink = manifest.logo["@id"].split("/")[0] + "//"

                                                for (let index = 1; index < manifest.logo["@id"].split("/").length - 4; index++) {
                                                    resultLink += manifest.logo["@id"].split("/")[index] + "/";
                                                }

                                                resultLink += "/info.json"
                                            } else {
                                                Swal.fire({
                                                    title: "Impossible de lire le manifest",
                                                    showCancelButton: true,
                                                    showConfirmButton: false,
                                                    cancelButtonText: 'OK',
                                                    icon: 'warning',
                                                })
                                            }

                                            project = buildJsonProjectWithManifest(projectID, document.getElementById("project_name").value,   document.getElementById("project_desc").value,  new Date(),new Date(),resultLink)
                                            
                                        } else {
                                            project =                                             project = buildJsonProjectWithManifest(projectID, document.getElementById("project_name").value,   document.getElementById("project_desc").value,  new Date(),new Date(), manifest_url)
                                        }


                                        if (localStorage.getItem("adno_projects") === undefined || localStorage.getItem("adno_projects") === null) {

                                            // If projects in local storage don't exist create the array
                                            var projects = []
                                            projects.push(projectID)


                                            // Création du projet dans le localStorage
                                            insertInLS(projectID, JSON.stringify(project))

                                            // Insertion de l'ID du projet créé dans le tableau des projets
                                            insertInLS("adno_projects", JSON.stringify(projects))
                                        } else {

                                            // Création du projet dans le localStorage
                                            insertInLS(projectID, JSON.stringify(project))

                                            // Insertion de l'ID du projet créé dans le tableau des projets
                                            projects = JSON.parse(localStorage.getItem("adno_projects"))
                                            projects.push(projectID)
                                            insertInLS("adno_projects", JSON.stringify(projects))
                                        }

                                        localStorage.removeItem("adno_image_url")
                                        this.props.history.push("/project/" + projectID)
                                    })

                                } else {
                                    this.setState({ isLoading: false })
                                    Swal.fire({
                                        title: "Impossible de lire le manifest",
                                        showCancelButton: true,
                                        showConfirmButton: false,
                                        cancelButtonText: 'OK',
                                        icon: 'warning',
                                    })
                                }
                            })
                    }

                } else {
                    this.setState({ isLoading: false })
                    Swal.fire({
                        title: "Impossible de lire ce fichier, veuillez renseigner un fichier ayant un des formats suivant : png, jpg, json",
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonText: 'OK',
                        icon: 'warning',
                    })
                }


            }
        }

        return (
            <form className="form-new-project">
                <div className="mb-3">
                    <label htmlFor="project_name" className="form-label">Titre</label>
                    <input id="project_name" type="text" className="form-control" placeholder="Donnez un titre à votre projet" />
                </div>
                <div className="mb-3">
                    <label htmlFor="project_desc" className="form-label">Description</label>
                    <input id="project_desc" className="form-control" type="text" placeholder="Description de votre projet" />
                </div>
                <div className="mb-3">
                    <label htmlFor="manifest_url" className="form-label">URL du Manifest</label>
                    <input id="manifest_url" value={localStorage.getItem("adno_image_url")} type="text" className="form-control" disabled={true} placeholder="liendumanifest.json" />
                </div>
                <div className="new_project_btns">
                    <button id="annuler_creation" type="submit" className="btn btn-danger" onClick={() => this.props.history.push("/")}>Annuler</button>
                    <button id="valider_creation" type="submit" className="btn btn-primary" onClick={(e) => createProj(e)}>Créer mon projet</button>
                </div>
            </form>
        )
    }
}

export default withRouter(NewProject)