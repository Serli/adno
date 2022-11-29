import Swal from "sweetalert2"
import { buildJsonProjectWithManifest, generateUUID, insertInLS } from "../../../Utils/utils"

export async function manageUrls(props, url) {

    fetch(url)
        .then(res => {
            if (res.status == 200 || res.status == 201) {
                insertInLS("adno_image_url", url)

                res.json()
                    .then(manifest => {
                        console.log(manifest)

                        if (manifest.format && manifest.format === "Adno") {
                            console.log("format adno");

                            Swal.fire({
                                title: "Projet ADNO détecté, voulez-vous l'importer ?",
                                showCancelButton: true,
                                showConfirmButton: true,
                                confirmButtonText: 'OK',
                                cancelButtonText: "Annuler",
                                icon: 'info'
                            })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        console.log("Importation en cours...");
                                        let projectID = generateUUID();
                                        console.log(projectID);

                                        // console.log(manifest.hasAttribute("source") && manifest.hasAttribute("label") && manifest.hasAttribute("subject"));

                                        let project = buildJsonProjectWithManifest(projectID, manifest.label, manifest.subject, manifest.source)

                                        // Création du projet dans le localStorage
                                        insertInLS(projectID, JSON.stringify(project))

                                        // Insertion de l'ID du projet créé dans le tableau des projets
                                        projects = JSON.parse(localStorage.getItem("adno_projects"))
                                        projects.push(projectID)
                                        insertInLS("adno_projects", JSON.stringify(projects))


                                        insertInLS(`${projectID}_annotations`, JSON.stringify(manifest.first.items))

                                        // remove current url
                                        localStorage.removeItem("adno_image_url")

                                        Swal.fire({
                                            title: "Projet importé avec succès",
                                            showCancelButton: false,
                                            showConfirmButton: true,
                                            confirmButtonText: 'OK',
                                            icon: 'success'
                                        })
                                            .then((result) => {
                                                if (result.isConfirmed) {
                                                    props.history.push("/")
                                                }
                                            })


                                    }
                                })


                        } else {
                            console.log("format non ADNO");
                            // props.history.push("/new")

                        }

                    })

            } else {
                throw new Error(`Error ${res.status}`)
            }
        })
        .catch(err => {
            console.log(err);
            Swal.fire({
                title: "Impossible de traiter l'url fournie",
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'OK',
                icon: 'error',
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        console.log("OK");
                    }
                })
        })



}