function uploadPicture1(){
    document.getElementById("import_1").disabled = false;
}

function uploadPicture2(){
    document.getElementById("import_2").disabled = false;
}


// document.getElementById('import').onclick = function () {
//     var files = document.getElementById('selectFiles').files;
//     var fr = new FileReader();

//     if (files[0]) {
//         fr.readAsText(files[0])

//         fr.onload = function (e) {

//             // Generate a new ID and new last_update

//             imported_project = JSON.parse(e.target.result)
//             imported_project.last_update = new Date()
//             imported_project.id = generateUUID()

//             projects = JSON.parse(localStorage.getItem("adno_projects"))
//             projects.push(imported_project)

//             localStorage.setItem("adno_projects", JSON.stringify(projects))

//             window.location.reload(true)

//         }
//     } else {
//         alert("Veuillez sélectionner un fichier ")
//     }
// };