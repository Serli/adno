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

Annotorious.SelectorPack(anno);
Annotorious.BetterPolygon(anno);
// Init the ToolBar plugin
Annotorious.Toolbar(anno, document.getElementById('toolbar-container'));


anno.on('createAnnotation', function(annotation) {
    console.log("nouvelle annotation : ", annotation);
  });