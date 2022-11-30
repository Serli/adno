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
import { faCheckCircle, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Paragraph from "editorjs-paragraph-with-alignment";
import { Component } from "react";
import Swal from 'sweetalert2';
import { insertInLS } from '../../../Utils/utils';

import "./AdnoRichText.css"

class AdnoRichText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleting: false
    }
  }

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


  deleteAnnotation = () => {
    var annotationID = this.props.selectedAnnotation.id  
    var annos = this.props.annotations;

      // Update the localStorage without the removed item
      insertInLS(`${this.props.selectedProjectId}_annotations`, JSON.stringify(annos.filter(annotation => annotation.id != annotationID)))
      this.props.updateAnnos(annos.filter(annotation => annotation.id != annotationID))
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
                    txt += `${html_tag}${block.data.text}${html_closing_tag}`;
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

          {/* <button className="btn btn-outline-danger" onClick={() => this.deleteAnnotation()}> <FontAwesomeIcon icon={faTrash} /> Delete</button> */}
          {!this.state.isDeleting && <button className="btn btn-outline-danger" onClick={() => this.setState({ isDeleting: true })}> <FontAwesomeIcon icon={faTrash} /> Delete </button>}
          {this.state.isDeleting && <button className="btn btn-outline-success" onClick={() => {this.setState({ isDeleting: false }), this.deleteAnnotation(), this.props.closeRichEditor()}}> <FontAwesomeIcon icon={faCheckCircle} /> Confirm</button>}


        </div>
      </div>
    )
  }
}

export default AdnoRichText