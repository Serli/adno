if (window.location.search.substring(4) !== "" && window.location.search.substring(4) !== null && window.location.search.substring(4) !== undefined) {


    selected_project = JSON.parse(localStorage.getItem(window.location.search.substring(4)))

    // Ajout d'un input pour le titre du projet
    document.getElementById("project_name").value = selected_project.title

    document.getElementById("project_name").addEventListener("change", function (e) {

        selected_project.title = e.target.value
        selected_project.last_update = new Date()

        localStorage.setItem(selected_project.id, JSON.stringify(selected_project))
    })

    // Ajout d'un input pour la description du projet
    if (selected_project.description !== "") {
        document.getElementById("project_desc").value = selected_project.description
    } else {
        document.getElementById("project_desc").placeholder = "Aucune description disponible pour ce projet"
    }

    document.getElementById("project_desc").addEventListener("change", function (e) {
        selected_project.description = e.target.value
        selected_project.last_update = new Date()

        localStorage.setItem(selected_project.id, JSON.stringify(selected_project))
    })


} else {
    document.getElementById("project_container").innerHTML = ""
    alert("Aucun projet n'a été sélectionné")
}

document.getElementById("preview").addEventListener("click", function () {
    window.location.href = "project.html?id=" + selected_project.id
})

var viewer = OpenSeadragon({
    id: 'openseadragon1',
    tileSources: [selected_project.manifest_url],
    prefixUrl: 'https://openseadragon.github.io/openseadragon/images/'
});

var anno = OpenSeadragon.Annotorious(viewer, {
    locale: 'auto',
    drawOnSingleClick: true,
    allowEmpty: true,
    disableEditor: false
});


// Find annotations from the localStorage in JSON format
var annotations = selected_project.id + "_annotations"
var annos = localStorage.getItem(annotations)

// Generate dataURI and load annotations into Annotorious
const dataURI = "data:application/json;base64," + btoa(annos);
anno.loadAnnotations(dataURI)


Annotorious.SelectorPack(anno);
Annotorious.BetterPolygon(anno);
Annotorious.Toolbar(anno, document.getElementById('toolbar-container'));

// Manage creation of new annotation
anno.on('createAnnotation', function (annotation) {
    var project_annotations_id = selected_project.id + "_annotations";

    var annotations = JSON.parse(localStorage.getItem(project_annotations_id))

    if (annotations === undefined || annotations === null) {
        annotations = [
            annotation
        ]
    } else {
        annotations.push(annotation)
    }

    // Update the last update date for the selected project
    selected_project.last_update = new Date()
    localStorage.setItem(selected_project.id, JSON.stringify(selected_project))

    // Update annotations linked to the selected project in the localStorage
    localStorage.setItem(project_annotations_id, JSON.stringify(annotations))


    generateAnnotations()
});

// Manage update of annotation
anno.on('updateAnnotation', function (upated_anno) {

    selected_anno = selected_project.annotations.filter(anno => anno.id === upated_anno.id)[0]


    Object.assign(selected_anno, upated_anno);

    selected_project.last_update = new Date()

    localStorage.setItem(selected_project.id, JSON.stringify(selected_project))
    generateAnnotations()
});