function uploadPicture1(){
    document.getElementById("import_1").disabled = false;
}

function uploadPicture2(){
    document.getElementById("import_2").disabled = false;
}

document.getElementById('import_2').onclick = function () {
    loadImportedProject('selectFiles_2')
};

document.getElementById('import_1').onclick = function () {
    loadImportedProject('selectFiles_1')
};

function loadImportedProject(importNumber){
    var files = document.getElementById(importNumber).files;
    var fr = new FileReader();

    console.log(files[0]);

    if (files[0]) {
        fr.readAsText(files[0])

        fr.onload = function (e) {

            // Generate a new ID and new last_update

            imported_project = JSON.parse(e.target.result)

            proj = imported_project.project;
            annos = imported_project.annotations

            proj.last_update = new Date()
            proj.id = generateUUID()

            projects = JSON.parse(localStorage.getItem("adno_projects"))
            projects.push(proj.id)

            localStorage.setItem("adno_projects", JSON.stringify(projects))
            localStorage.setItem(proj.id + "_annotations", JSON.stringify(annos))
            localStorage.setItem(proj.id, JSON.stringify(proj))

            window.location.reload(true)

        }
    } else {
        alert("Veuillez sélectionner un fichier ")
    }
}

