if (window.location.search.substring(4) !== "" && window.location.search.substring(4) !== null && window.location.search.substring(4) !== undefined) {

    projects = JSON.parse(localStorage.getItem("adno_projects"))
    selected_project = projects.filter(project => project.id === window.location.search.substring(4))[0]

    if (selected_project === undefined || selected_project === null) {
        document.getElementById("project_container").innerHTML = ""
        alert("Projet inexistant")
    } else {
        document.getElementById("project_name").innerHTML = selected_project.title

        createViewer(selected_project)

        document.getElementById("edit-project").addEventListener("click", function () {
            window.location.href = "edit.html?id=" + selected_project.id
        })


        if (selected_project.description !== "") {
            document.getElementById("project_desc").innerHTML = selected_project.description
        } else {
            document.getElementById("project_desc").innerHTML = "Aucune description disponible pour ce projet"
        }

    }

} else {
    document.getElementById("project_container").innerHTML = ""
    alert("Aucun projet n'a été sélectionné")
}


function createViewer(selected_project) {
    document.getElementById("image_iiif").innerHTML = "";

    let annotationsUrl = "http://localhost:8000/annotations/" + window.location.search.substring(4) + "_annotations.json"

    // var content = '<iiif-storyboard  styling="toggleoverlay: true; tts=true;" annotationurl="' + selected_project.manifest_url + '" ></iiif-storyboard>';
    // var content = '<iiif-storyboard  styling="toggleoverlay: true; tts=true;" annotationurl=" ' + annotationsUrl +' " ></iiif-storyboard>';



    var content = '<iiif-storyboard  styling="toggleoverlay: true; tts=true;" annotationurl="'+annotationsUrl+'"></iiif-storyboard>';



    document.getElementById("image_iiif").innerHTML = content

}





