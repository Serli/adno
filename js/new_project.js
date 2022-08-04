// localStorage.setItem("adno_projects", [])

document.getElementById("manifest_url").value = localStorage.getItem("adno_image_url")


document.getElementById("valider_creation").addEventListener('click', event => {
    event.preventDefault()


    if (document.getElementById("project_name").value === "") {
        alert("Veuillez renseigner un titre à votre projet")
    } else {

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
                            "manifest_url": manifest_url
                        };


                        if (localStorage.getItem("adno_projects") === undefined || localStorage.getItem("adno_projects") === null) {

                            // If projects in local storage don't exist create the array
                            var projects = []
                            projects.push(projectID)


                            // Création du projet dans le localStorage
                            localStorage.setItem(projectID, JSON.stringify(project))

                            // Insertion de l'ID du projet créé dans le tableau des projets
                            localStorage.setItem("adno_projects", JSON.stringify(projects))
                        } else {

                            // Création du projet dans le localStorage
                            localStorage.setItem(projectID, JSON.stringify(project))

                            // Insertion de l'ID du projet créé dans le tableau des projets
                            projects = JSON.parse(localStorage.getItem("adno_projects"))
                            projects.push(projectID)
                            localStorage.setItem("adno_projects", JSON.stringify(projects))
                        }




                        localStorage.removeItem("adno_image_url")
                        window.location.href = "/project.html?id=" + projectID;

                    })


                } else {
                    alert("impossible de lire le manifest")
                }
            })
    }
})




document.getElementById("annuler_creation").addEventListener("click", function (event) {
    event.preventDefault()
    window.location.href = "/"
})