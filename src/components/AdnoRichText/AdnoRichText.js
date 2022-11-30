import CheckList from '@editorjs/checklist';
import Code from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import EditorJS from "@editorjs/editorjs";
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Quote from '@editorjs/quote';
import Raw from '@editorjs/raw';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Paragraph from "editorjs-paragraph-with-alignment";
import { Component } from "react";
import Swal from 'sweetalert2';
import { insertInLS } from '../../../Utils/utils';

import "./AdnoRichText.css"

class AdnoRichText extends Component {

  editor = new EditorJS({
    holder: "editorJS",
    data: {
      "blocks": this.props.selectedAnnotation.body[1] ? this.props.selectedAnnotation.body[1].value : []
    },
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


  deleteAnnotation = (annotationID) => {

    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cette annotation ?',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer mon annotation',
      cancelButtonText: 'Annuler',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        var annos = this.props.annotations;

        // Update the localStorage without the removed item
        insertInLS(`${this.props.match.params.id}_annotations`, JSON.stringify(annos.filter(annotation => annotation.id != annotationID)))

        Swal.fire("L'annotation a bien été supprimée", '', 'success')
          .then((result) => {
            result.isConfirmed ? this.props.updateAnnos(annos.filter(annotation => annotation.id != annotationID)) : ""
          })
      }
    })
  }


  render() {
    return (

      <div class="card adno-rich-editor">
        <div class="card-header" style={{ "display": "flex", "justifyContent": "space-between" }}>
          <p> Adno Rich Text Editor</p>
          <button className="btn btn-danger" onClick={() => this.props.closeRichEditor()}>x</button></div>
        <div class="card-body over-hidden">
          <div class="card-text">
            <div id="editorJS" class="p-3"></div>
          </div>
        </div>
        <div class="card-footer text-right">

          {/* <button id="btnReset" class="btn" onClick={() => this.editor.clear()}>Reset</button> */}

          {/* <button id="btn_readonly" class="btn">Read ONLY</button> */}

          <button className="btn btn-outline-primary" onClick={() => {

            let txt = "";
            this.editor.save().then(outputData => {
              outputData.blocks.forEach(block => {
                console.log(block);

                switch (block.type) {
                  case "header":
                    let html_tag = `<h${block.data.level}>`;
                    let html_closing_tag = `</h${block.data.level}>`;
                    txt += `${html_tag}${block.data.text }${html_closing_tag}`;
                    break;
                  default:
                    txt += `<p>${block.data.text}</p>`;
                }

              })

              let annos = JSON.parse(localStorage.getItem(`${this.props.selectedProjectId}_annotations`))

              let current_anno = {
                "type": "TextualBody",
                "value": txt,
                "purpose": "commenting"
              }

              let current_anno_with_blocks = {
                "type": "AdnoRichText",
                "value": outputData.blocks,
                "purpose": "richtext"
              }

              annos.filter(anno => anno.id === this.props.selectedAnnotation.id)[0].body = [current_anno, current_anno_with_blocks]

              insertInLS(`${this.props.selectedProjectId}_annotations`, JSON.stringify(annos))
              this.props.updateAnnos(annos)
              this.props.closeRichEditor()

            })

          }
          }> <FontAwesomeIcon icon={faSave} /> Save</button>

          <button className="btn btn-outline-danger" onClick={() => this.deleteAnnotation()}> <FontAwesomeIcon icon={faTrash} /> Delete</button>


        </div>
      </div>
    )
  }
}

export default AdnoRichText