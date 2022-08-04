function generateNautre() {
    if (!localStorage.getItem("adno_projects")) {
     console.log("aucun projet"); 
        localStorage.setItem("adno_projects", JSON.stringify([]))
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
        localStorage.setItem(projectID, JSON.stringify(project))

        // Add new project 
        projects.push(projectID)
        localStorage.setItem("adno_projects", JSON.stringify(projects))

        // Create annotations object
        localStorage.setItem(projectID + "_annotations", JSON.stringify(annotations))

}