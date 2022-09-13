import { Component } from "react";
import { withRouter } from "react-router";

// Import popup alerts
import Swal from "sweetalert2";

// Import utils
import { importProjectJsonFile, insertInLS, generateUUID, checkProjectAttributes } from "../../../Utils/utils";

// Import CSS
import "./ImportProject.css";

class ImportProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isimporting: false,
            loadedProject: ""
        }
    }

    render() {
        const loadImportedProj = () => {
            if (this.state.loadedProject.type === "application/json") {


                if (this.state.loadedProject) {

                    // importProjectJsonFile(this.state.loadedProject)

                    let fr = new FileReader();

                    fr.readAsText(this.state.loadedProject)

                    fr.onload = (e) => {

                        // Generate a new ID and new last_update

                        let imported_project = JSON.parse(e.target.result)
                        imported_project.project.last_update = new Date().toISOString()

                        // First, check if the imported JSON contains two attributes (project & annotations)
                        if (!imported_project.project || !imported_project.annotations) {
                            Swal.fire({
                                title: 'Impossible de lire ce fichier JSON !',
                                showCancelButton: false,
                                showConfirmButton: true,
                                confirmButtonText: 'OK',
                                icon: 'warning',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload()
                                }
                            })

                            // if the imported JSON file contains two attributes, verify if the annotation's attribute is an real array
                        } else if (imported_project.project && imported_project.annotations && !Array.isArray(imported_project.annotations)) {
                            Swal.fire({
                                title: "Erreur : ce fichier JSON n'a pas été formaté correctement",
                                showCancelButton: false,
                                showConfirmButton: true,
                                confirmButtonText: 'OK',
                                icon: 'warning',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload()
                                }
                            })
                            // Finally, check if the project contains all required attributes (title, description, creation_date, last_update, manifest_url)
                        } else if (imported_project.project && imported_project.annotations && Array.isArray(imported_project.annotations) && !checkProjectAttributes(imported_project.project)) {

                            Swal.fire({
                                title: "Erreur : ce fichier JSON n'a pas été formaté correctement",
                                showCancelButton: false,
                                showConfirmButton: true,
                                confirmButtonText: 'OK',
                                icon: 'warning',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload()
                                }
                            })
                            // If the JSON input was correctly fullfilled then import the project
                        } else {
                            let proj = imported_project.project;
                            let annos = imported_project.annotations

                           // proj.last_update = new Date()
                            proj.id = generateUUID()

                            let projects = JSON.parse(localStorage.getItem("adno_projects"))
                            projects.push(proj.id)

                            insertInLS("adno_projects", JSON.stringify(projects))
                            insertInLS(proj.id + "_annotations", JSON.stringify(annos))
                            insertInLS(proj.id, JSON.stringify(proj))


                            if(this.props.projects){
                                this.props.updateProjects([...this.props.projects, proj])
                            }


                            Swal.fire({
                                title: "Projet importé avec succès !",
                                showCancelButton: false,
                                showConfirmButton: true,
                                confirmButtonText: 'OK',
                                icon: 'success',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload()
                                }
                            })
                        }
                    }
                } else {
                    Swal.fire({
                        title: 'Veuillez sélectionner un fichier ',
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonText: 'OK',
                        icon: 'warning',
                    })
                }
            } else {
                Swal.fire({
                    title: 'Impossible de lire ce type de fichier !',
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonText: 'OK',
                    icon: 'warning',
                })
            }
        }

        return (
            <div className="import_project">

                <label className="adno-upload-file" id="label-upload" htmlFor="selectFiles_1">Importer un projet</label>

                <input accept="application/json" type="file" id="selectFiles_1" onChange={(e) => {
                    this.setState({ isimporting: true, loadedProject: e.target.files[0] })
                    document.getElementById("label-upload").innerHTML = "Fichier selectionné : " + e.target.files[0].name
                }} />

                {
                    this.state.isimporting ?
                        <div className="import-btns">
                            <button className="import-btn import-reset" disabled={!this.state.isimporting} onClick={() => {
                                this.setState({ isimporting: false })
                                document.getElementById("selectFiles_1").value = ""
                                document.getElementById("label-upload").innerHTML = "Importer un projet"
                            }
                            }>Annuler l'importation</button>
                            <button id="import_1" className="import-btn import-confirm" disabled={!this.state.isimporting} onClick={() => loadImportedProj()}>Importer mon projet</button>
                        </div>

                        : <></>

                }


            </div>
        )
    }
}

export default withRouter(ImportProject)