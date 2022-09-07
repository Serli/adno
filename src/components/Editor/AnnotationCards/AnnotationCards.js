import { faDownLong, faTrashAlt, faUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import ReactHtmlParser from 'react-html-parser';
import { withRouter } from "react-router";
import Swal from "sweetalert2";
import { insertInLS, stripHtml } from "../../../../Utils/utils";
import TTS from "../TTS/TTS";
import "./../../../../Utils/customElems.js";
//Imports CSS
import "./AnnotationCards.css";

class AnnotationCards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const annoSwitchUp = (index) => {

            var annos = this.props.annotations;

            var annoToSwitch = annos[index - 1]

            annos[index - 1] = annos[index]
            annos[index] = annoToSwitch

            insertInLS(this.props.match.params.id + "_annotations", JSON.stringify(annos))

            window.location.reload(true)

        }

        const annoSwitchDown = (index) => {
            var annos = this.props.annotations;

            var annoToSwitch = annos[index + 1]

            annos[index + 1] = annos[index]
            annos[index] = annoToSwitch

            insertInLS(this.props.match.params.id + "_annotations", JSON.stringify(annos))

            window.location.reload(true)


        }


        const deleteAnnotation = (index) => {

            Swal.fire({
                title: 'Voulez-vous vraiment supprimer cette annotation ?',
                showCancelButton: true,
                confirmButtonText: 'Oui, supprimer mon annotation',
                cancelButtonText: 'Annuler',
                icon: 'warning',
            }).then((result) => {
                if (result.isConfirmed) {
                    var annos = this.props.annotations;

                    if (index > -1) { // only splice array when item is found
                        annos.splice(index, 1); // 2nd parameter means remove one item only
                    }

                    insertInLS(this.props.match.params.id + "_annotations", JSON.stringify(annos))

                    Swal.fire("L'annotation a bien été supprimée", '', 'success')
                        .then((result) => {
                            result.isConfirmed ? window.location.reload() : ""
                        })
                }
            })



        }


        const buildTagsList = (annotation) => {
            var tags = annotation.body.filter(anno_body => anno_body.purpose === "tagging")


            var tagLists = "Aucun tag"

            if (tags && tags.length > 0) {
                tagLists = '[TAGS]  [ '
                tags.forEach((tag) => { tagLists += tag.value + " " })
                tagLists += " ]"
            }

            return tagLists;
        }

        const addImageToAnnotation = (body, index) => {

            // create an image 
            let newImg = '<img src ="https://cdn.pixabay.com/photo/2022/08/09/16/19/sea-7375377_960_720.jpg"></img>'

            console.log(body += newImg)
            console.log(this.props.match.params.id);

            // update annotation


            // update annotations list in local storage

        }


        return (

            <>
                <h3 className="adno-nb-annos"> {this.props.annotations.length} annotation(s) trouvée(s)</h3>

                <div className="list_annotations">

                    {this.props.annotations.map((annotation, index) => {
                        return (
                        <div className="anno-card" key={"anno_" + index}>
                            <div className="anno-card-body">
                                <h5 className="card-title adno-card-title">{annotation.body[0] && annotation.body[0].value ? ReactHtmlParser(annotation.body[0].value) : "Aucun titre"}</h5>

                                <TTS text={stripHtml(annotation.body[0].value)} />

                                {/* <button onClick={() => {addImageToAnnotation(annotation.body[0].value), index}}>add image</button> */}

                                <h6 className="card-subtitle mb-2 text-muted"> {buildTagsList(annotation)} </h6>
                                <button className="btn btn-danger" onClick={() => deleteAnnotation(index)}> <FontAwesomeIcon icon={faTrashAlt} /> Supprimer</button>
                                {/* <button onClick="clickAnnotation(1)"> Voir</button> */}
                                {index < this.props.annotations.length - 1 ? <button className="btn btn-primary" onClick={() => annoSwitchDown(index)}> <FontAwesomeIcon icon={faDownLong} /> DOWN </button> : <></>}
                                {index > 0 ? <button className="btn btn-primary" onClick={() => annoSwitchUp(index)}> <FontAwesomeIcon icon={faUpLong} />  UP </button> : <></>}
                            </div >
                        </div >
                        )
                    })}
                </div >
            </>

        )
    }
}
export default withRouter(AnnotationCards)