import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { withRouter } from "react-router";

// Import popup alerts
import Swal from "sweetalert2";

// Import utils
import { importProjectJsonFile, insertInLS, generateUUID, checkProjectAttributes} from "../../../Utils/utils";

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

    resetImport = () => {
        this.setState({ isimporting: false })
        document.getElementById("selectFiles_1").value = ""
        document.getElementById("label-upload").innerHTML = "Importer un projet"
    }

    render() {
        const loadImportedProj = () => {
            if (this.state.loadedProject.type === "application/json") {


                if (this.state.loadedProject) {

                    // Call function to load the project
                    importProjectJsonFile(this.state.loadedProject)
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

                <label className="adno-upload-file" id="label-upload" htmlFor="selectFiles_1"> <FontAwesomeIcon icon={faUpload} /> Importer un projet</label>

                <input accept="application/json" type="file" id="selectFiles_1" onChange={(e) => {
                    this.setState({ isimporting: true, loadedProject: e.target.files[0] })
                    document.getElementById("label-upload").innerHTML = "Fichier selectionné : " + e.target.files[0].name
                }} />

                {
                    this.state.isimporting ?
                        <div className="import-btns">
                            <button className="import-btn import-reset" disabled={!this.state.isimporting} onClick={() => {
                                this.resetImport()
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