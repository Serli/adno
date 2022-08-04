if (window.location.search.substring(4) !== "" && window.location.search.substring(4) !== null && window.location.search.substring(4) !== undefined) {

    selected_project = JSON.parse(localStorage.getItem(window.location.search.substring(4)))

    if (selected_project === undefined || selected_project === null) {
        document.getElementById("project_container").innerHTML = ""
        projectNotFound()
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
    projectNotFound()
}


function createViewer(selected_project) {


    // Find annotations from the localStorage in JSON format
    var annotations = selected_project.id + "_annotations"
    var annos = localStorage.getItem(annotations)


    // Check if there is at least one annotation
    if(annos){
         // Create the dataURI linked to the annotations
        const dataURI = "data:application/json;base64," +  btoa(annos);

        // Create and display an annona storyboard 
        document.getElementById("image_iiif").innerHTML  = '<iiif-storyboard  styling="toggleoverlay: true; tts=true;" annotationurl="'+dataURI+'"></iiif-storyboard>';

        // Display every annotation in the left side
        JSON.parse(annos).map(annotation => {
            console.log(annotation);
            document.getElementById("list_annotations").innerHTML += annotation.body[0].value
        })

    }else{
        OpenSeadragon({
            id: 'image_iiif',
            tileSources: [selected_project.manifest_url],
            prefixUrl: 'https://openseadragon.github.io/openseadragon/images/'
        });
    }
}





