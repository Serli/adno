import { Component } from "react";
import AnnotationCards from "../AdnoEditor/AnnotationCards/AnnotationCards";
import ViewerAnnotationCards from "../AdnoViewer/ViewerAnnotationCards/ViewerAnnotationCards";

// Import CSS
import "./SidebarAnnotations.css"

class SidebarAnnotations extends Component {
    render() {

        return (
            <div id="mySidebar" className="sidebar">
                <button className="btn btn-danger closebtn" onClick={() => this.props.closeNav()}>×</button>

                {
                    this.props.editingMode ?
                        <AnnotationCards openRichEditor={(annotation) => {this.props.openRichEditor(annotation)}} annotations={this.props.annotations} updateAnnos={(updated_annos) => this.props.updateAnnos(updated_annos)} />
                        :
                        <ViewerAnnotationCards editingMode={this.props.editingMode} annotations={this.props.annotations} />
                }

            </div>
        )
    }
}
export default SidebarAnnotations;