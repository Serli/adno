import { Component } from "react";
import { withRouter } from "react-router";
import Swal from "sweetalert2";
import { insertInLS, isValidUrl } from "../../../Utils/utils";
// Imports CSS
import "./LandingPage.css";

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isimporting: false,
            adno_image_url: ""
        }
    }

    render() {
         const newProject = (e) => {
            e.preventDefault()

            if (this.state.adno_image_url !== "" && this.state.adno_image_url !== undefined) {

                if (isValidUrl(this.state.adno_image_url)) {

                    insertInLS("adno_image_url", this.state.adno_image_url)

                    this.props.history.push("/new");

                    // fetch(this.state.adno_image_url)
                    //     .then(response => {
                    //         console.log(response.status);
                    //         if (response.status === 200 || response.status === 302) {
                    //             insertInLS("adno_image_url", this.state.adno_image_url)

                    //             this.props.history.push("/new");
                    //         } else {
                    //             Swal.fire({
                    //                 title: "L'URL renseignée n'est pas valide !",
                    //                 showCancelButton: true,
                    //                 showConfirmButton: false,
                    //                 cancelButtonText: 'OK',
                    //                 icon: 'warning',
                    //             })
                    //         }
                    //     })
                    //     .catch(error => {
                    //         Swal.fire({
                    //             title: "L'URL renseignée n'est pas valide !",
                    //             showCancelButton: true,
                    //             showConfirmButton: false,
                    //             cancelButtonText: 'OK',
                    //             icon: 'warning',
                    //         })
                    //     })


                } else {
                    Swal.fire({
                        title: "L'URL renseignée n'est pas valide !",
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonText: 'OK',
                        icon: 'warning',
                    })
                }



            } else {
                Swal.fire({
                    title: 'Veuillez renseigner une URL valide',
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonText: 'OK',
                    icon: 'warning',
                })
            }
        }
        return (

            <div className="landing_page">
                <div className="land-body">

                    <h1 className="land-title">ADNO - Editeur et visualiseur web IIIF</h1>
                    <p className="land-desc-adno">Adno est une application web de visualisation, d’édition et de partage pair-à-pair de narrations et de parcours sur des images IIIF.</p>


                    <form className="landing-form">

                        <input className="land-input-url" type="url" placeholder="Renseignez ici l'url de votre fichier" value={this.state.adno_image_url} onChange={(e) => this.setState({ adno_image_url: e.target.value })} />

                        <button className="land-btn-first-proj" onClick={(e) => newProject(e)}>Créer mon premier projet ! </button>

                    </form>

                </div>


            </div>
        )
    }
}
export default withRouter(LandingPage);