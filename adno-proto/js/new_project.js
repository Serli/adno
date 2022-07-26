// localStorage.setItem("adno_projects", [])

document.getElementById("manifest_url").value = localStorage.getItem("adno_image_url")


function generateUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

document.getElementById("valider_creation").addEventListener('click', event => {
    event.preventDefault()

    var manifest_url = localStorage.getItem("adno_image_url")

    var projectID = generateUUID()

    fetch(manifest_url)
        .then(rep => {
            if (rep.status === 200) {

                rep.json().then(manifest => {
                    let project =
                    {
                        "id": projectID,
                        "title": document.getElementById("project_name").value,
                        "description": document.getElementById("project_desc").value,
                        "creation_date": new Date(),
                        "last_update": new Date(),
                        "manifest": manifest
                    };


                    if (localStorage.getItem("adno_projects") === undefined || localStorage.getItem("adno_projects") === null) {

                        var projects = []
                        projects.push(project)

                        localStorage.setItem("adno_projects", JSON.stringify(projects))
                    } else {
                        projects = JSON.parse(localStorage.getItem("adno_projects"))
                        projects.push(project)
                        localStorage.setItem("adno_projects", JSON.stringify(projects))
                    }

                   // alert("projet ajouté");


                    localStorage.removeItem("adno_image_url")
                    window.location.href = "/project.html?id=" + projectID; 

                })


            } else {
                alert("impossible de lire le manifest")
            }
        })
})




document.getElementById("annuler_creation").addEventListener("click", function(event){
    event.preventDefault()
    window.location.href = "/"
})