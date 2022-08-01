if (window.location.search.substring(4) !== "" && window.location.search.substring(4) !== null && window.location.search.substring(4) !== undefined) {
    
    projects = JSON.parse(localStorage.getItem("adno_projects"))
    selected_project = projects.filter(project => project.id === window.location.search.substring(4))[0]
   
    // Ajout d'un input pour le titre du projet
    document.getElementById("project_name").value = selected_project.title

    document.getElementById("project_name").addEventListener("change", function(e){

        selected_project.title = e.target.value
        selected_project.last_update = new Date()

       localStorage.setItem("adno_projects", JSON.stringify(projects))
    })

    // Ajout d'un input pour la description du projet
    if(selected_project.description !== ""){
        document.getElementById("project_desc").value = selected_project.description
    }else{
        document.getElementById("project_desc").placeholder = "Aucune description disponible pour ce projet"
    }

    document.getElementById("project_desc").addEventListener("change", function(e){
        selected_project.description = e.target.value
        selected_project.last_update = new Date()

       localStorage.setItem("adno_projects", JSON.stringify(projects))
    })


} else {
    document.getElementById("project_container").innerHTML = ""
    alert("Aucun projet n'a été sélectionné")
}

document.getElementById("preview").addEventListener("click", function(){
    window.location.href = "project.html?id=" + selected_project.id
})


function generateAnnotations(){
    document.getElementById("dl_annotations").innerHTML = '<a id="dl_annotations_btn" style="position:relative" href=" ' + URL.createObjectURL(new Blob([JSON.stringify(selected_project.annotations)], { type: "text/plain" })) + ' " download="' + selected_project.id + '_annotations.json" class="btn btn-secondary btn-sm"> Télécharger les annotations  </a>';
}

generateAnnotations()




var viewer = OpenSeadragon({
    id: 'openseadragon1',
    tileSources: ['https://iiif.micr.io/dzzLm/info.json'],
    prefixUrl: 'https://openseadragon.github.io/openseadragon/images/'
});

var anno = OpenSeadragon.Annotorious(viewer, {
    locale: 'auto',
    drawOnSingleClick: true,
    allowEmpty: true,
    disableEditor: false
});

//anno.loadAnnotations("https://dnoneill.github.io/annotate/annotations/wh234bz9013-0001-list.json");




annotation_base_url = "http://localhost:8000/annotations/"
project_id = selected_project.id
annos_link = annotation_base_url + project_id + "_annotations.json"

fetch(annos_link)
.then(rep => {
    if(rep.status === 200){
        anno.loadAnnotations(annos_link)
    }
})


Annotorious.SelectorPack(anno);
Annotorious.BetterPolygon(anno);
// Init the ToolBar plugin
Annotorious.Toolbar(anno, document.getElementById('toolbar-container'));


anno.on('createAnnotation', function(annotation) {
    console.log("nouvelle annotation : ", annotation);

    selected_project = projects.filter(project => project.id === window.location.search.substring(4))[0]

    if(selected_project.annotations === undefined || selected_project.annotations === null ){
        selected_project.annotations = [
            annotation
        ]
    }else{
        selected_project.annotations.push(annotation)
    }

    selected_project.last_update = new Date()

    localStorage.setItem("adno_projects", JSON.stringify(projects))
    generateAnnotations()
});

anno.on('updateAnnotation', function(upated_anno) {

    selected_anno = selected_project.annotations.filter(anno => anno.id === upated_anno.id)[0]
    

    Object.assign(selected_anno, upated_anno);

    selected_project.last_update = new Date()

    localStorage.setItem("adno_projects", JSON.stringify(projects))
    console.log("annotation ", selected_anno.id , " updated");
    generateAnnotations()
});

document.getElementById("dl_serv").addEventListener("click", function(){
    fetch("http://localhost:8001/api/annotations/" + window.location.search.substring(4),
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(selected_project.annotations)
    })
})