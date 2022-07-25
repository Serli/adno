if(localStorage.getItem("adno_projects") === undefined || localStorage.getItem("adno_projects") === null){
   var projects = []
    localStorage.setItem("adno_projects", JSON.stringify(projects))
}else{
    var projects = JSON.parse(localStorage.getItem("adno_projects"))

    var projectsListDiv = ""
    
    projects.map(elem =>
        {
            projectsListDiv += '<p>' + elem.title + '</p>'
            projectsListDiv += '<a href="project.html?id=' + elem.id +'">Voir le projet</a>'
            projectsListDiv += '<button type="button" class="btn btn-primary btn-sm" onclick=deleteProject("' + elem.id +'")> supprimer  </button>';
        })

    document.getElementById("projects_list").innerHTML = projectsListDiv

}

document.getElementById("voir_image").addEventListener("click", function(e){
    e.preventDefault()

    var url = document.getElementById("adno_image_url").value

    if(url !== "" && url !== undefined){
        localStorage.setItem("adno_image_url", url)

        window.location.href = "viewer.html";
    }else{
        alert("veuillez remplir ce champs correctement")
    }
})


document.getElementById("creer_projet").addEventListener("click", function(e){
    e.preventDefault()

    var url = document.getElementById("adno_image_url").value

    if(url !== "" && url !== undefined){
        localStorage.setItem("adno_image_url", url)

        window.location.href = "new_project.html";

    }else{
        alert("veuillez remplir ce champs correctement")
    }
})

function deleteProject(idProject){
    projects = JSON.parse(localStorage.getItem("adno_projects"))

    newProjectsList = projects.filter(project => project.id !== idProject)

    localStorage.setItem("adno_projects", JSON.stringify(newProjectsList))

    alert("liste des projets a bien été mise à jour")
}