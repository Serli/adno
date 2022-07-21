function annoter(){
    var annotation = {
        "type": "Annotation",
        "body": [
            {
                "type": "TextualBody",
                "value": "annotation",
                "purpose": "commenting"
            }
        ],
        "target": {
            "source": "https://iiif.micr.io/dzzLm",
            "selector": {
                "type": "SvgSelector",
                "value": "<svg><circle cx=\"18250.763671875\" cy=\"16507.84521484375\" r=\"2815.291149471843\"></circle></svg>"
            }
        },
        "@context": "http://www.w3.org/ns/anno.jsonld",
        "id": "#53cbc04d-4ef4-42f9-bfae-728c50ba2995"
    }

    localStorage.setItem("annotations", JSON.stringify(annotation))
}