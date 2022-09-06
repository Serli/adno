import { Component } from "react";
import { withRouter } from "react-router";
import Swal from "sweetalert2";
import { insertInLS } from "../../../Utils/utils";
import ImportProject from "../ImportProject/ImportProject";
import "./HomeWithoutProjects.css";

class HomeWithoutProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isimporting: false,
            adno_image_url: ""
        }
    }

    render() {
        const newProject = (e) => {
            e.preventDefault()

            if (this.state.adno_image_url !== "" && this.state.adno_image_url !== undefined) {
                insertInLS("adno_image_url", this.state.adno_image_url)

                this.props.history.push("/new");

            } else {
                Swal.fire({
                    title: 'Veuillez renseigner une URL valide',
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonText: 'OK',
                    icon: 'warning',
                })
            }
        }


        return (
            <div id="container_without_projects" className="adno_container_wp">
                <div className="jumbotron mt-3">
                    <h1>ADNO</h1>
                    <p className="lead">Adno est une application web de visualisation, d’édition et de partage pair-à-pair de narrations
        et de parcours sur des images IIIF.</p>
                </div>


                <form id="myFormWithoutProjects">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">URL</span>
                        <input type="text" id="adno_image_url_2" className="form-control" value={this.state.adno_image_url} onChange={(e) => this.setState({ adno_image_url: e.target.value })}
                            placeholder="Renseignez ici votre fichier info.json ou votre image jpg/png" />
                    </div>

                    <button id="create_project" type="submit" className="btn btn-success" onClick={(e) => newProject(e)}>Créer un nouveau projet</button>
                </form>

                <h2 className="import_project_separator_without_projects">OU</h2>

                <ImportProject />
            </div>
        )
    }
}

export default withRouter(HomeWithoutProjects);