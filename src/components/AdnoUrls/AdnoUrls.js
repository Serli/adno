import { Component } from "react";
import { withRouter } from "react-router";
import Swal from "sweetalert2";
import { manageUrls } from "./manageUrls";

class AdnoUrls extends Component {

    componentDidMount() {
        let url = (new URLSearchParams(this.props.location.search))
        let manifest_url =  url.get("url")
        let file_type = url.get("url_type")
        console.log(manifest_url);
        console.log(file_type);

        Swal.fire({
            title: `Voulez-vous charger ce fichier ? ${manifest_url}`,
            showCancelButton: true,
            confirmButtonText: 'Oui, charger ce fichier',
            cancelButtonText: 'Annuler',
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
             
                            manageUrls(this.props, manifest_url)
                            console.log("fichier chargé");
                        
                        // else {
                        //     Swal.fire({
                        //         title: `Impossible de charger ce fichier ${url}`,
                        //         showCancelButton: false,
                        //         confirmButtonText: 'OK',
                        //         icon: 'danger',
                        //     })
                        // }
                    
            }
        })
    }
    render() {
        return (
            <p>
                {
                    this.props.location.search
                }
            </p >
        )
    }
}
export default withRouter(AdnoUrls)