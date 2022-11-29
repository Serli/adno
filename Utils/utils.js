import Swal from "sweetalert2";

// Function to insert something in the localStorage.
// Will return an alert if the localStorage is full
export function insertInLS(itemName, itemValue) {
  try {
    localStorage.setItem(itemName, itemValue);
  } catch (e) {
    console.log("err name ", e.name);
    if (e.name === 'QuotaExceededError') {
      alert('Quota exceeded!');
    }
  }
}

// Function to generate a random UUID such as b9930ecc-6a18-43f5-8a09-93eb6262f590
export function generateUUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

// Function to create an IIIF example
// You have to set a title, description and the manifest URL in order to generate your example
export function generateExamplePainting(title, description, manifest_url) {

  if (!localStorage.getItem("adno_projects")) {
    insertInLS("adno_projects", JSON.stringify([]))
  }
  let projects = JSON.parse(localStorage.getItem("adno_projects"))

  var projectID = generateUUID()

  var project = {
    "id": projectID,
    "title": title,
    "description": description,
    "creation_date": new Date(),
    "last_update": new Date(),
    "manifest_url": manifest_url
  }

  // Create and store the new project in the localStorage
  insertInLS(projectID, JSON.stringify(project))

  // Add new project 
  projects.push(projectID)
  insertInLS("adno_projects", JSON.stringify(projects))

  // Create annotations object
  insertInLS(`${projectID}_annotations`, JSON.stringify([]))

  Swal.fire({
    title: `Tableau ${title} ajouté aux projets avec succès`,
    showCancelButton: false,
    confirmButtonText: 'Ok',
    icon: 'success',
  })
    .then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/"
      }
    })
}



export function findInfoJsonFromManifest(url) {
  return fetch(url)
    .then(rep => rep.json())
    .then(result => {
      var resultLink = ""

      for (let index = 0; index < 7; index++) {
        resultLink += result.sequences[0].canvases[0].images[0].resource["@id"].split("/")[index]

        if (index === 0) {
          resultLink += "//"
        } else {
          resultLink += "/"
        }

      }

      resultLink += "info.json"


      return resultLink;
    })
}


export const checkIfProjectExists = (id) => {
  return localStorage.getItem(id) ? true : false;
}

export const stripHtml = (html) => {
  let tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

export const getYoutubeVideoID = (url) => {

  if (isValidUrl(url)) {
    if (url.indexOf("https://www.youtube.com/watch?v=") !== -1) {
      return url.split("https://www.youtube.com/watch?v=")[1]
    } else {
      return ""
    }
  } else {
    return ""
  }
}

export const buildYoutubeEmbed = (url, params) => {


  // params.forEach(param => {
  //     console.log(param);
  // });

  let embed = `https://www.youtube.com/embed/${getYoutubeVideoID(url)}`;

  let iframe_ytb = document.createElement("iframe")
  iframe_ytb.src = embed;

  return iframe_ytb;

}

export const buildAudioPlayer = (source_url) => {
  // let source_url = `https://www.youtube.com/embed/${getYoutubeVideoID(url)}`;

  let audio_player = document.createElement("audio")
  let audio_source = document.createElement("source")
  audio_source.src = source_url
  audio_player.appendChild(audio_source)
  audio_player.controls = true;

  return audio_player;
}

const buildWideImg = (source) => {
  let wideImg = document.createElement("img")

  wideImg.src = source

  wideImg.style.height = '650px'
  wideImg.style.position = 'absolute'
  wideImg.style.top = "10vh"
  wideImg.style.width = "80vw"
  wideImg.style.zIndex = 100000
  wideImg.style.left = "10vw"
  wideImg.style.right = "10vw"

  wideImg.ondblclick = function () {
    this.remove()
  }

  document.querySelector("body").appendChild(wideImg)

}

export const buildImage = (source_url) => {
  let image = document.createElement("img")
  image.style.width = '200px';
  image.style.height = '150px';
  image.src = source_url
  image.ondblclick = function () {
    buildWideImg(source_url)
  }

  return image;
}

export const get_url_extension = (url) => {
  return url.split(/[#?]/)[0].split('.').pop().trim();
}

export const buildTagsList = (annotation) => {
  var tags = annotation.body.filter(anno_body => anno_body.purpose === "tagging")

  return tags && tags.length > 0 ? tags.reduce((previousValue, currentValue) => previousValue + " " + currentValue.value, "[TAGS] ") : "Aucun tag"
}

export const buildJsonProjectWithManifest = (id, title, desc, cd, la, manifest) => {
  return {
    "id": id,
    "title": title,
    "description": desc,
    "creation_date": cd,
    "last_update": la,
    "manifest_url": manifest
  }
}

export const buildJsonProjectWithImg = (id, title, desc, cd, la, img) => {
  return {
    "id": id,
    "title": title,
    "description": desc,
    "creation_date": cd,
    "last_update": la,
    "img_url": img
  }
}

export const buildProjectAdnoFormat = (title, description, manifest) => {
  return (
    {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "id": generateUUID(),
      "type": "AnnotationCollection",
      "label": title,
      "subject": description,
      "date": new Date(),
      "modified": new Date(),
      "source": manifest,
      "format": "Adno",
      "total": 0,
      "first": {
        "id": "http://example.org/page1",
        "type": "AnnotationPage",
        "startIndex": 0,
        "items": []
      }
    }
  )
}

export const createExportProjectJsonFile = (projectID) => {

  // Get project from localStorage
  var project = JSON.parse(localStorage.getItem(projectID))

  // Then, get all annotations
  var annotations = JSON.parse(localStorage.getItem(projectID + "_annotations"))

  var finalProject =
  {

    "@context": "http://www.w3.org/ns/anno.jsonld",
    "id": project.id,
    "type": "AnnotationCollection",
    "label": project.title,
    "subject": project.description,
    "autor": project.autor || "",
    "editor": project.editor || "",
    "date": project.creation_date,
    "modified": project.last_update,
    "source": project.manifest_url ? project.manifest_url : project.img_url,
    "format": "Adno",
    "total": annotations && annotations.length ? annotations.length : 0,
    "first": {
      "id": "page1",
      "type": "AnnotationPage",
      "startIndex": 0,
      "items": annotations && annotations.length > 0 ? annotations : [],
    }
  }
  return URL.createObjectURL(new Blob([JSON.stringify(finalProject)], { type: "text/plain" }));
}


export const importProjectJsonFile = (loadedProject) => {
  let fr = new FileReader();

  fr.readAsText(loadedProject)

  fr.onload = function (e) {
    let imported_project = JSON.parse(e.target.result)

    if (imported_project.hasOwnProperty("@context")
      && imported_project.hasOwnProperty("date")
      && imported_project.hasOwnProperty("id")
      && imported_project.hasOwnProperty("label")
      && imported_project.hasOwnProperty("type")
      && imported_project.hasOwnProperty("modified")
      && imported_project.hasOwnProperty("source")
      && imported_project.hasOwnProperty("subject")
      && imported_project.hasOwnProperty("total")
    ) {

      // Generate a new ID and new last_update
      imported_project.modified = new Date()
      imported_project.id = generateUUID()

      let projects = JSON.parse(localStorage.getItem("adno_projects"))
      projects.push(imported_project.id)

      let proj = {
        "id": imported_project.id,
        "title": imported_project.label,
        "description": imported_project.subject,
        "creation_date": imported_project.date,
        "last_update": imported_project.modified,
        "manifest_url": imported_project.source,
      }

      let annos = imported_project.total !== 0 ? imported_project.first.items : []

      insertInLS("adno_projects", JSON.stringify(projects))
      insertInLS(proj.id + "_annotations", JSON.stringify(annos))
      insertInLS(proj.id, JSON.stringify(proj))

      window.location.reload()

    } else {
      Swal.fire({
        title: "Impossible de lire le fichier",
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'OK',
        icon: 'warning',
      })
    }

  }
}


export function checkProjectAttributes(imported_project) {
  return imported_project.hasOwnProperty('id') && imported_project.hasOwnProperty('title') && imported_project.hasOwnProperty('description') && imported_project.hasOwnProperty('creation_date') && imported_project.hasOwnProperty('last_update') && imported_project.hasOwnProperty('manifest_url')
}


export function duplicateProject(projectID){
  const project = JSON.parse(localStorage.getItem(projectID))
  const project_annos = JSON.parse(localStorage.getItem(`${projectID}_annotations`))
  
  const target = {};

  Object.assign(target, project);

  target.id = generateUUID()
  target.last_update = new Date().toLocaleString()
  target.creation_date = new Date().toLocaleString()

  insertInLS(target.id, JSON.stringify(target))
  insertInLS(`${target.id}_annotations`, JSON.stringify(project_annos))

  var projects = JSON.parse(localStorage.getItem("adno_projects"))
  projects.push(target.id)
  insertInLS("adno_projects", JSON.stringify(projects))
}

export function createDate(){
  return new Date().toISOString().slice(0, 10);
}