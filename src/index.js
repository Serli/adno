import "./styles.css";
import "bootstrap";
import "bootstrap-css";

import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from "editorjs-paragraph-with-alignment";
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import EditorJS from "@editorjs/editorjs";


const editor = new EditorJS({
  holder: "editorJS",
  tools: {
    embed: {
      class: Embed,
      inlineToolbar: true
    },
    table: Table,
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
    },
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    image: Image,
    raw: Raw,
    header: Header,
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
  }
});

let btnSaves = document.getElementById("btnSaves");
btnSaves.addEventListener("click", () => {
  editor.save().then(outputData => {
    console.log(outputData);
  });
});


let btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click", () => {
  editor.clear();
});

let btnUpdateBlock = document.getElementById("btnAddBlock");
btnUpdateBlock.addEventListener("click", () => {
  editor.blocks.render({
    "blocks": [
      {
        "id": "WvJypp7gzi",
        "type": "header",
        "data": {
          "text": "Editor.js",
          "level": 2
        }
      },
      {
        "id": "MTHGWBHZI3",
        "type": "paragraph",
        "data": {
          "text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
          "alignment": "left"
        }
      },
      {
        "id": "rLog56FO_9",
        "type": "header",
        "data": {
          "text": "Key features",
          "level": 3
        }
      },
      {
        "id": "9XlNSF-c0B",
        "type": "list",
        "data": {
          "style": "unordered",
          "items": [
            "It is a block-styled editor",
            "It returns clean data output in JSON",
            "Designed to be extendable and pluggable with a simple API"
          ]
        }
      },
      {
        "id": "13ScLrrXfm",
        "type": "header",
        "data": {
          "text": "What does it mean «block-styled editor»",
          "level": 3
        }
      },
      {
        "id": "qNgokTgrdh",
        "type": "paragraph",
        "data": {
          "text": "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.",
          "alignment": "left"
        }
      },
      {
        "id": "J2Lf6Ar2HY",
        "type": "paragraph",
        "data": {
          "text": "There are dozens of <a href=\"https://github.com/editor-js\">ready-to-use Blocks</a> and the <a href=\"https://editorjs.io/creating-a-block-tool\">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.",
          "alignment": "left"
        }
      },
      {
        "id": "HCkfjvW8Or",
        "type": "header",
        "data": {
          "text": "What does it mean clean data output",
          "level": 3
        }
      },
      {
        "id": "yuprerwUg8",
        "type": "paragraph",
        "data": {
          "text": "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below",
          "alignment": "left"
        }
      },
      {
        "id": "nriBREv_sN",
        "type": "paragraph",
        "data": {
          "text": "Given data can be used as you want: render with HTML for <code class=\"inline-code\">Web clients</code>, render natively for <code class=\"inline-code\">mobile apps</code>, create markup for <code class=\"inline-code\">Facebook Instant Articles</code> or <code class=\"inline-code\">Google AMP</code>, generate an <code class=\"inline-code\">audio version</code> and so on.",
          "alignment": "left"
        }
      },
      {
        "id": "KaLwj0BD8X",
        "type": "paragraph",
        "data": {
          "text": "Clean data is useful to sanitize, validate and process on the backend.",
          "alignment": "left"
        }
      },
      {
        "id": "eAtjt8Ieax",
        "type": "delimiter",
        "data": {}
      },
      {
        "id": "XrsOd95VYv",
        "type": "paragraph",
        "data": {
          "text": "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
          "alignment": "left"
        }
      },
      {
        "id": "P98LibqdoP",
        "type": "image",
        "data": {
          "file": {
            "url": "https://codex.so/public/app/img/external/codex2x.png"
          },
          "caption": "",
          "withBorder": false,
          "stretched": false,
          "withBackground": false
        }
      },
      {
        "id": "vH6A0w7VQf",
        "type": "linkTool",
        "data": {
          "link": "https://codex.so",
          "meta": {
            "title": "CodeX Team",
            "site_name": "CodeX",
            "description": "Club of web-development, design and marketing. We build team learning how to build full-valued projects on the world market.",
            "image": {
              "url": "https://codex.so/public/app/img/meta_img.png"
            }
          }
        }
      },
      {
        "id": "2JNpYjcSJ9",
        "type": "paragraph",
        "data": {
          "text": "un texte ici",
          "alignment": "left"
        }
      },
      {
        "id": "iCQElFzEmF",
        "type": "header",
        "data": {
          "text": "et un titre là",
          "level": 1
        }
      }
    ]
  })
})


var btn_readOnly = document.getElementById("btn_readonly")

btn_readOnly.addEventListener("click", () => {
  editor.readOnly.toggle();
})


var checkHTML = document.getElementById("check_html")



checkHTML.addEventListener("click", () => {

  var tab = []

  editor.save().then(outputData => {

    for (let index = 0; index < outputData.blocks.length; index++) {
      const element = outputData.blocks[index];

      if (element.data.text) {
        tab.push({
          "@context": "http://www.w3.org/ns/anno.jsonld",
          "id": index,
          "type": "Annotation",
          "body": [
            {
              "type": "TextualBody",
              "value": element.data.text,
              "purpose": "commenting"
            }
          ],
          "target": {
            "source": "https://free.iiifhosting.com/iiif/1c8d49343676a04fffcd92979c02e9394e48bac96f590fffbadffc9133cd06b9",
            "selector": {
              "type": "SvgSelector",
              "value": "<svg><circle cx=\"3188.51025390625\" cy=\"1764.909912109375\" r=\"3079.0459316497704\"></circle></svg>"
            }
          },
          "modified": "2022-11-24T10:45:14.867Z",
          "created": "2022-11-24T10:45:14.867Z"
        })

      }

    }

    console.log(tab);

  })


})