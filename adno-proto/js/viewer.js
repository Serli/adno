// Set url for the IIIF picture
var url = localStorage.getItem("adno_image_url")
localStorage.removeItem("adno_editor_manifest")

fetch(url)
    .then(rep => {
        if (rep.status === 200) {
            document.getElementById("image_iiif").innerHTML = "";

            var content = '<iiif-storyboard  styling="toggleoverlay: true; tts=true;" annotationurl="' + url + '" ></iiif-storyboard>';
            content += "<button id='goto_editor'> Voir l 'éditeur </button>"

            document.getElementById("image_iiif").innerHTML = content

            document.getElementById("goto_editor").addEventListener("click", function () {

                rep.json().then(manifest => localStorage.setItem("adno_editor_manifest", JSON.stringify(manifest)))

                window.location.href = "edit.html";
            })

        } else {
            document.getElementById("image_iiif").innerHTML += "Le fichier que vous essayez de lire est malheureusement inaccessible"
        }
    })


