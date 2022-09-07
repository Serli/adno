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

function generateUUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}


export function generateNautre() {
  if (!localStorage.getItem("adno_projects")) {
    console.log("aucun projet");
    insertInLS("adno_projects", JSON.stringify([]))
  }
  projects = JSON.parse(localStorage.getItem("adno_projects"))

  var projectID = generateUUID()

  var project = {
    "id": projectID,
    "title": "Siège de Poitiers par Coligny en 1569",
    "description": "Tableau de françois nautré",
    "creation_date": new Date(),
    "last_update": new Date(),
    "manifest_url": "https://free.iiifhosting.com/iiif/1c8d49343676a04fffcd92979c02e9394e48bac96f590fffbadffc9133cd06b9/info.json"
  }

  var annotations = [
    {
      "type": "Annotation",
      "body": [
        {
          "type": "TextualBody",
          "value": "description 1",
          "purpose": "commenting"
        }
      ],
      "target": {
        "source": "https://free.iiifhosting.com/iiif/1c8d49343676a04fffcd92979c02e9394e48bac96f590fffbadffc9133cd06b9",
        "selector": {
          "type": "FragmentSelector",
          "conformsTo": "http://www.w3.org/TR/media-frags/",
          "value": "xywh=pixel:1677.994140625,4341.73193359375,2421.4248046875,492.11865234375"
        }
      },
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "id": "#5e9b659a-9647-44cf-85c6-d0f6f660173a"
    },
    {
      "type": "Annotation",
      "body": [
        {
          "type": "TextualBody",
          "value": "description 2",
          "purpose": "commenting"
        }
      ],
      "target": {
        "source": "https://free.iiifhosting.com/iiif/1c8d49343676a04fffcd92979c02e9394e48bac96f590fffbadffc9133cd06b9",
        "selector": {
          "type": "FragmentSelector",
          "conformsTo": "http://www.w3.org/TR/media-frags/",
          "value": "xywh=pixel:5555.4384765625,4308.015625,2541.52880859375,517.9130859375"
        }
      },
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "id": "#fae77a7c-51f8-445a-a57d-bcd9e1f65a0c"
    }
  ]

  // Create and store the new project in the localStorage
  insertInLS(projectID, JSON.stringify(project))

  // Add new project 
  projects.push(projectID)
  insertInLS("adno_projects", JSON.stringify(projects))

  // Create annotations object
  insertInLS(projectID + "_annotations", JSON.stringify(annotations))

  console.log("Nautré généré : " + projectID);

  alert("Tableau Siège de Poitiers par Coligny en 1569 ajouté aux projets avec succès")

}

export function generateExamplePainting(title, description, manifest_url) {

  if (!localStorage.getItem("adno_projects")) {
    console.log("aucun projet");
    insertInLS("adno_projects", JSON.stringify([]))
  }
  projects = JSON.parse(localStorage.getItem("adno_projects"))

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
  insertInLS(projectID + "_annotations", JSON.stringify([]))

  alert("Tableau " + title + " ajouté aux projets avec succès")
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
