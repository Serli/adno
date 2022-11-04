import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { withRouter } from "react-router";
import Swal from "sweetalert2";
import { generateUUID, insertInLS } from "../../../../Utils/utils";
import "./NewJourney.css"

class NewJourney extends Component {
    constructor(props){
        super(props)
    }

    addJourney = async () => {
        const { value: journeyTitle } = await Swal.fire({
            title: 'Donnez un titre à votre parcours',
            input: 'text',
            inputPlaceholder: 'Mon super parcours ...'
          })
          
          if (journeyTitle && journeyTitle.length >= 1) {
            var project = JSON.parse(localStorage.getItem(this.props.match.params.id_project))

            let journey = {
                "@context": "http://www.w3.org/ns/anno.jsonld",
                "id": `journey_${generateUUID()}`,
                "type": "AnnotationPage",
                "label": journeyTitle,
                "date": new Date(),
                "modified": new Date(),
                "format": "Adno",
                "items": []
            }

            project.journeys ? project.journeys.push(journey.id) : project.journeys = [journey.id]
    
            project.last_update = new Date()
    
            insertInLS(journey.id, JSON.stringify(journey))
    
            insertInLS(project.id, JSON.stringify(project))
            
            window.location.reload()


          }else{
            Swal.fire(`Oops une erreur est survenue : Veuillez donner un titre à votre parcours`)
          }
    }

    render(){
        return(
            <div className="add-journey">
                <button className="add-journey-btn" onClick={() => this.addJourney()}> <FontAwesomeIcon icon={faAdd} size={"5x"} /></button>
            </div>
        )
    }
}

export default withRouter(NewJourney);