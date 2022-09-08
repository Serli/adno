import { Component } from "react";
import ProjectView from "../ProjectView/ProjectView";

export default class ProjectsList extends Component {
    render() {

        var projects = []

        var allProjectsID = JSON.parse(localStorage.getItem("adno_projects"))
        allProjectsID.map(projectID => {
            projects.push(JSON.parse(localStorage.getItem(projectID)))
        })

        if (projects.length > 0) {
            return (
                <div id="projects_list">
                    {
                        projects.map(project => {
                            return (<ProjectView key={project.id} project={project} />)
                        })
                    }
                </div>
            )

        } else {
            return "Aucun projet"
        }




    }
}