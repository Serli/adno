import { Component } from "react";
import AnnotationCards from "../AdnoEditor/AnnotationCards/AnnotationCards";
import ViewerAnnotationCards from "../AdnoViewer/ViewerAnnotationCards/ViewerAnnotationCards";

// Import CSS
import "./SidebarAnnotations.css"

class SidebarAnnotations extends Component {
    render() {

        return (
            <div id="mySidebar" className="sidebar">


                <button className="btn btn-circle" onClick={() => this.props.closeNav()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {
                    this.props.editingMode ?
                        <AnnotationCards updateProject={(updatedProject) => this.props.updateProject(updatedProject)} selectedProject={this.props.selectedProject} openRichEditor={(annotation) => { this.props.openRichEditor(annotation) }} annotations={this.props.annotations} updateAnnos={(updated_annos) => this.props.updateAnnos(updated_annos)} />
                        :
                        <ViewerAnnotationCards editingMode={this.props.editingMode} annotations={this.props.annotations} selectedProject={this.props.selectedProject}/>
                }

            </div>
        )
    }
}
export default SidebarAnnotations;