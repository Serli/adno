import { Component } from "react";
import { withRouter } from "react-router";
import NewJourney from "./NewJourney/NewJourney";

// Import CSS
import "./Journeys.css"
import Swal from "sweetalert2";
import { insertInLS } from "../../../Utils/utils";

class Journey extends Component {
    constructor(props) {
        super(props)
        this.state = {
            journeys: []
        }
    }

    componentDidMount() {

        if (!localStorage.getItem(this.props.match.params.id_project)) {
            this.props.history.push("/")
        }


        var project = JSON.parse(localStorage.getItem(this.props.match.params.id_project))

        var journeys = []
        project.journeys && project.journeys.length > 0 && project.journeys.forEach(journey => {
            journeys.push(JSON.parse(localStorage.getItem(journey)))
        });

        this.setState({ journeys })
    }

    selectJourney = (id_journey) => {
        this.props.history.push(`/${this.props.match.params.id_project}/journeys/${id_journey}`)
    }

    editJourney = (id_journey) => {
        this.props.history.push(`/${this.props.match.params.id_project}/journeys/${id_journey}/edit`)
    }

    deleteJourney = (id_journey) => {

        Swal.fire({
            title: 'Voulez-vous vraiment supprimer ce parcours ?',
            text: "Cette action est irreversible !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Supprimer mon parcours'
        }).then((result) => {
            if (result.isConfirmed) {

                // remove journey in LS
                localStorage.removeItem(id_journey)

                var project = JSON.parse(localStorage.getItem(this.props.match.params.id_project))

                project.journeys = project.journeys.filter(journey => journey !== id_journey)

                // remove idJourney from journeys array in the selected project
                insertInLS(this.props.match.params.id_project, JSON.stringify(project))

                window.location.reload()

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })


    }

    editJourneyName = async (id_journey) => {

        const { value: journeyTitle } = await Swal.fire({
            title: 'Renommer mon parcours',
            input: 'text',
            inputPlaceholder: 'Mon super parcours ...',
            showCancelButton: true,
            cancelButtonText: "Annuler",
            inputValidator: (value) => {
                if (!value || value.length < 5) {
                    return 'Veuillez remplir ce champs ! (minimum 5 caractères)'
                }
            }
        })


        if (journeyTitle) {

            var journey = JSON.parse(localStorage.getItem(id_journey))

            journey.label = journeyTitle

            insertInLS(id_journey, JSON.stringify(journey))

            window.location.reload()
        }
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Liste des parcours : </h1>

                <div className="journeys">
                    {
                        this.state.journeys && this.state.journeys.map((item) => {
                            return (
                                <div className="journey_card" >
                                    <p>{item.label}</p>
                                    <button className="btn btn-primary" onClick={() => this.editJourneyName(item.id)}>Renommer le parcours</button>
                                    <button className="btn btn-danger" onClick={() => this.deleteJourney(item.id)}>Supprimer ce parcours</button>
                                    <button className="btn btn-success" onClick={() => this.selectJourney(item.id)}>Preview</button>
                                    <button className="btn btn-success" onClick={() => this.editJourney(item.id)}>Editer le parcours</button>
                                </div>

                            )
                        })
                    }
                    <NewJourney />

                </div>
            </div>
        )
    }
}

export default withRouter(Journey);