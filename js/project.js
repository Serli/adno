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
    if (annos && annos != JSON.stringify([])) {
        // Create the dataURI linked to the annotations
        const dataURI = "data:application/json;base64," + btoa(annos);

        // Create and display an annona storyboard 
        document.getElementById("image_iiif").innerHTML = '<iiif-storyboard  styling="toggleoverlay: true; tts=true;" annotationurl="' + dataURI + '"></iiif-storyboard>';


        var nbAnnotationText = document.createElement("p")
        var newContent = document.createTextNode(JSON.parse(annos).length + ' annotation(s) trouvée(s)')
        // ajoute le nœud texte au nouveau div créé
        nbAnnotationText.appendChild(newContent);

        document.getElementById("list_annotations").appendChild(nbAnnotationText)

        // Display every annotation in the left side
        JSON.parse(annos).map((annotation, index) => {
            var card = '<div class="card" style="width: 18rem;">'
            card += '<div class="card-body">'
            card += '   <h5 class="card-title">' + getAnnotationText(annotation.body[0].value) + '</h5>'
            card += '   <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>'
            card += '   <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card</p>'
            card += '   <a href="#" class="card-link">Card link</a>'
            card += '   <a href="#" class="card-link">Another link</a>'
            card += '   <button onclick = "clickAnnotation(' + index + ')" > Voir</button >'
            card += ' </div>'
            card += ' </div>'

            //document.getElementById("data_0_0").children[0].children[0].click()

            document.getElementById("list_annotations").innerHTML += card
        })

    } else {
        OpenSeadragon({
            id: 'image_iiif',
            tileSources: [selected_project.manifest_url],
            prefixUrl: 'https://openseadragon.github.io/openseadragon/images/'
        });
    }
}


function getAnnotationText(annotation) {
    if (annotation.indexOf("iframe") !== -1 || annotation.indexOf("img") !== -1) {
        const div = document.createElement('div')
        div.innerHTML = annotation
        console.log(div.children);
        const iframe = div.children[0]
        console.log(iframe);
        return iframe.tagName === "IMG" ? " [IMG] " + iframe.src : iframe.tagName === "IFRAME" ? " [VIDEO] " + iframe.src : iframe.src
    }
    return annotation
}




function clickAnnotation(index) {

    console.log("click annotation");

    var indexId = "data_" + index + "_" + index

    document.getElementById(indexId).children[0].children[0].click()
}