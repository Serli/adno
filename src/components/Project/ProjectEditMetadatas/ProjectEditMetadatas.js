import { Component } from "react";
import { createDate, insertInLS } from "../../../../Utils/utils";

class ProjectEditMetadatas extends Component {
    // Update project values
    updateProjectTitle(newTitle) {
        this.props.updateProject({ ...this.props.selectedProject, "title": newTitle })
        insertInLS(this.props.selectedProject.id, JSON.stringify({ ...this.props.selectedProject, "title": newTitle, "modified": createDate() }))
    }

    updateProjectDesc(newDesc) {
        this.props.updateProject({ ...this.props.selectedProject, "description": newDesc })
        insertInLS(this.props.selectedProject.id, JSON.stringify({ ...this.props.selectedProject, "description": newDesc, "modified": createDate() }))
    }

    updateProjectAutor(newAutor) {
        this.props.updateProject({ ...this.props.selectedProject, "autor": newAutor })
        insertInLS(this.props.selectedProject.id, JSON.stringify({ ...this.props.selectedProject, "autor": newAutor, "modified": createDate() }))
    }

    updateProjectEditor(newEditor) {
        this.props.updateProject({ ...this.props.selectedProject, "editor": newEditor })
        insertInLS(this.props.selectedProject.id, JSON.stringify({ ...this.props.selectedProject, "editor": newEditor, "modified": createDate() }))
    }

    updateProjectRights(rights) {
        this.props.updateProject({ ...this.props.selectedProject, "rights": rights })
        insertInLS(this.props.selectedProject.id, JSON.stringify({ ...this.props.selectedProject, "rights": rights, "modified": createDate() }))
    }

    render() {
        return (
            <div className="project-metadatas-backdrop">
                <div className="project-metadatas-container">


                    <div className="card-actions justify-end">
                        <button className="btn btn-square btn-sm" onClick={() => this.props.closeProjectMetadatas()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>


                    <div className="project-metadatas">

                        <label className="label">
                            <span className="label-text">Titre</span>
                        </label>
                        <input type="text" placeholder="Votre titre" className="input input-bordered w-full max-w-xs" value={this.props.selectedProject.title} onChange={(e) => this.updateProjectTitle(e.target.value)} />


                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text" placeholder="Renseignez ici la description" className="input input-bordered w-full max-w-xs" value={this.props.selectedProject.description} onChange={(e) => this.updateProjectDesc(e.target.value)} />


                        <label className="label">
                            <span className="label-text">Auteur</span>
                        </label>
                        <input type="text" placeholder="Renseignez ici l'auteur" className="input input-bordered w-full max-w-xs" value={this.props.selectedProject.autor} onChange={(e) => this.updateProjectAutor(e.target.value)} />

                        <label className="label">
                            <span className="label-text">Editeur</span>
                        </label>
                        <input type="text" placeholder="Renseignez ici l'editeur" className="input input-bordered w-full max-w-xs" value={this.props.selectedProject.editor} onChange={(e) => this.updateProjectEditor(e.target.value)} />


                        <label className="label">
                            <span className="label-text">Attribution des droits</span>
                        </label>
                        <input type="text" placeholder="Renseignez ici les droits de l'oeuvre" className="input input-bordered w-full max-w-xs" value={this.props.selectedProject.rights} onChange={(e) => this.updateProjectRights(e.target.value)} />


                        <small id="autosaving-txt" className="form-text text-muted">Les données que vous saisissez sont enregistrées automatiquement</small>

                    </div>
                </div>
            </div>
        )
    }
}
export default ProjectEditMetadatas;