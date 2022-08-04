if(localStorage.getItem("adno_projects") === undefined || localStorage.getItem("adno_projects") === null){
    
    var projects = []
    localStorage.setItem("adno_projects", JSON.stringify(projects))

    homeWithoutProjects()

}else if(JSON.parse(localStorage.getItem("adno_projects")).length < 1){
    homeWithoutProjects()
}else{
    homeWithProjects()
}


function homeWithoutProjects(){
    document.getElementById("container_with_projects").style.display = "none";
}

function homeWithProjects(){
    document.getElementById("container_without_projects").style.display = "none";


    var projects = []

    var allProjectsID =  JSON.parse(localStorage.getItem("adno_projects"))
    allProjectsID.map(projectID => {
        projects.push(JSON.parse(localStorage.getItem(projectID)))
    })

    var projectsListDiv = ""
    
    projects.map(elem =>
        {

            fetch(elem.manifest_url)
            .then(rep => rep.json())
            .then(manifest => {

                if(manifest["@id"]){
                    imgWidth = manifest["tiles"][0].width
                    sourceImg = manifest["@id"] + "/full/" + imgWidth + ",/0/default.jpg";
                }else if (manifest["id"]){
                    imgWidth = manifest["tiles"][0].width
                    sourceImg = manifest["id"] + "/full/" + imgWidth + ",/0/default.jpg";
                }

                projectsListDiv +=  '<div class="card mb-3" style="max-width: 540px;">'
                projectsListDiv +=  '   <div class="row g-0">'
                projectsListDiv +=  '       <div class="col-md-4">'
                projectsListDiv +=  '           <img src="'+sourceImg+'" class="img-fluid rounded-start" alt="...">'
                projectsListDiv +=  '       </div>'
                projectsListDiv +=  '       <div class="col-md-8">'
                projectsListDiv +=  '           <div class="card-body">'
                projectsListDiv +=  '               <h5 class="card-title">' + elem.title + '</h5>'
                projectsListDiv +=  '                   <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>'
                projectsListDiv +=  '                   <p class="card-text"><small class="text-muted">Créé le ' + elem.creation_date + '</small></p>'
                projectsListDiv +=  '                   <p class="card-text"><small class="text-muted">Dernière mise à jour : ' + elem.last_update + '</small></p>'
                projectsListDiv +=  '                   <button type="button" class="btn btn-danger btn-sm" onclick=deleteProject("' + elem.id +'")> Supprimer  </button>';
                projectsListDiv +=  '                   <button type="button" class="btn btn-success btn-sm" onclick=editProject("' + elem.id +'")> Editer</button>';
                projectsListDiv +=  '                   <button type="button" class="btn btn-primary btn-sm" onclick=showProject("' + elem.id +'")> Preview  </button>';
                projectsListDiv +=  '                   <a id="download_btn_' + elem.id+'" href=" ' + URL.createObjectURL(new Blob([JSON.stringify(elem)], { type: "text/plain" })) + ' " download="' + elem.title + '.json" class="btn btn-secondary btn-sm"> Download  </a>';
                projectsListDiv +=  '           </div>'
                projectsListDiv +=  '       </div>'
                projectsListDiv +=  '   </div>'
                projectsListDiv +=  '</div>'

                document.getElementById("projects_list").innerHTML = projectsListDiv

            })

           
        })

}

document.getElementById("create_project_1").addEventListener("click", function(e){
    e.preventDefault()

    var url = document.getElementById("adno_image_url_1").value

    if(url !== "" && url !== undefined){
        localStorage.setItem("adno_image_url", url)

        window.location.href = "new_project.html";

    }else{
        alert("veuillez remplir ce champs correctement")
    }
})


document.getElementById("create_project_2").addEventListener("click", function(e){
    e.preventDefault()

    var url = document.getElementById("adno_image_url_2").value

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

    homeWithProjects()

    alert("liste des projets a bien été mise à jour")
}

function showProject(idProject){
    window.location.href = "/project.html?id=" + idProject
}

function editProject(idProject){
    window.location.href = "/edit.html?id=" + idProject
}

