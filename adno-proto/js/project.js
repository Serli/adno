if (window.location.search.substring(4) !== "" && window.location.search.substring(4) !== null && window.location.search.substring(4) !== undefined) {
    
    projects = JSON.parse(localStorage.getItem("adno_projects"))
    selected_project = projects.filter(project => project.id === window.location.search.substring(4))[0]

    if (selected_project === undefined || selected_project === null) {
        document.getElementById("project_container").innerHTML = ""
        alert("Projet inexistant")
    } else {
        document.getElementById("project_id").innerHTML = selected_project.id
        document.getElementById("project_name").innerHTML = selected_project.title


        if(selected_project.description !== ""){
            document.getElementById("project_desc").innerHTML = selected_project.description
        }else{
            document.getElementById("project_desc").innerHTML = "Aucune description disponible pour ce projet"
        }

    }

} else {
    document.getElementById("project_container").innerHTML = ""
    alert("Aucun projet n'a été sélectionné")
}





