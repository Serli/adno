import { Component } from "react";
import { withRouter } from "react-router";

// Import popup alerts
import Swal from "sweetalert2";

// Import utils
import { importProjectJsonFile, insertInLS } from "../../../Utils/utils";
import { generateUUID } from "./../../../Utils/UUID";

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
                // let fr = new FileReader();

                if (this.state.loadedProject) {

                    importProjectJsonFile(this.state.loadedProject)

                    // fr.readAsText(this.state.loadedProject)

                    // fr.onload = function (e) {

                    //     // Generate a new ID and new last_update

                    //     let imported_project = JSON.parse(e.target.result)
                    //     let proj = imported_project.project;
                    //     let annos = imported_project.annotations

                    //     proj.last_update = new Date()
                    //     proj.id = generateUUID()

                    //     let projects = JSON.parse(localStorage.getItem("adno_projects"))
                    //     projects.push(proj.id)

                    //     insertInLS("adno_projects", JSON.stringify(projects))
                    //     insertInLS(proj.id + "_annotations", JSON.stringify(annos))
                    //     insertInLS(proj.id, JSON.stringify(proj))

                    //     window.location.reload(true)

                    // }
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