import { Component } from "react";
import { withRouter } from "react-router";
import Swal from "sweetalert2";
import { manageUrls } from "./manageUrls";

class AdnoUrls extends Component {

    componentDidMount() {
        let url = (new URLSearchParams(this.props.location.search))
        let manifest_url = url.get("url")
        Swal.fire({
            title: "Voulez-vous charger ce fichier ?",
            showCancelButton: true,
            confirmButtonText: 'Oui, charger ce fichier',
            cancelButtonText: 'Annuler',
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                manageUrls(this.props, manifest_url)
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