import { Component } from "react";
import { withRouter } from "react-router";

class Footer extends Component {
    render() {
        return (

            <footer>
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Copyrights</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Mentions Légales</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">CGU</a></li>
                </ul>
                <p className="text-center text-muted"> &copy; ADNO {new Date().getFullYear()} - Espace Mendès France, Poitiers. Ce projet a été soutenu par le ministère de la Culture
                </p>
            </footer>
        )
    }
}

export default Footer