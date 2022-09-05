import { Component } from "react";
import ProjectsList from "../ProjectsList/ProjectsList";

import "./HomeWithProjects.css"
import ImportProject from "../ImportProject/ImportProject";
import { insertInLS } from "../../../Utils/utils";
import { withRouter } from "react-router";


class HomeWithProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                alert("veuillez remplir ce champs correctement")
            }
        }

        return (

            <div id="container_with_projects" className="adno_container">
                <div className="with_projects">
                    <div className="with_projects_left">

                        <div className="jumbotron mt-3">
                            <h1>ADNO</h1>
                            <p className="lead">Adno est une application web de visualisation, d’édition et de partage pair-à-pair de
                            narrations
            et de parcours sur des images IIIF.</p>
                        </div>


                        <form id="myForm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">URL</span>
                                <input type="text" id="adno_image_url_2" className="form-control" value={this.state.adno_image_url} onChange={(e) => this.setState({adno_image_url: e.target.value})}
                                    placeholder="Renseignez ici votre fichier info.json ou votre image jpg/png" />
                            </div>

                            <button id="create_project_2" type="submit" className="btn btn-success" onClick={(e) => newProject(e)}>Créer un nouveau projet</button>
                        </form>

                    </div>

                    <div className="with_projects_right">
                        <ImportProject />

                        <h2>Vos Projets</h2>

                        <div id="projects_list">
                            <ProjectsList />
                        </div>
                    </div>

                </div>

            </div>

        )
    }
}

export default withRouter(HomeWithProjects);