import { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <footer className={this.props.location.pathname !== "/" || this.props.showFooter ? "" : "hide-footer"}>
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li><a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" className="nav-link px-2 text-muted">Copyrights</a></li>
                    <li><Link to="/legal" className="nav-link px-2 text-muted">Mentions Légales</Link></li>
                    <li><Link to="/cgu" className="nav-link px-2 text-muted">Conditions générales d'utilisation</Link></li>
                </ul>
                <p className="text-center text-muted"> &copy; ADNO {new Date().getFullYear()} - Espace Mendès France, Poitiers. Ce projet a été soutenu par le ministère de la Culture
                </p>
            </footer>
        )
    }
}

export default withRouter(Footer)