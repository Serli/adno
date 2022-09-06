import { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import history from "../../../Utils/history"

import "./Navbar.css"

class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <header className={this.props.location.pathname !== "/" || this.props.showNav ? "adno-navbar" : "hide-nav"}>
                <div className="navbar-container">

                    <div className="adno-nav-left">
                        <span className="adno-logo">ADNO</span>
                        {/* <img src="https://cdn.pixabay.com/photo/2022/07/30/04/46/sunrise-7353034_960_720.jpg" style={{"width": "100px"}} /> */}
                    </div>

                    <div className="adno-nav-right">
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="/" className={history.location.pathname === "/" ? "nav-active" : "adno-nav-item"}>Accueil</a></li>
                            <li><a href="/about" className={history.location.pathname === "/about" ? "nav-active" : "adno-nav-item"}>À propos</a></li>
                            <li><a href="/example" className={history.location.pathname === "/example" ? "nav-active" : "adno-nav-item"}>Exemples</a></li>
                            <li><a href="http://localhost:3000/docs" className={history.location.pathname === "/manual" ? "nav-active" : "adno-nav-item"}>Mode d'emploi</a></li>

                            <li><a href="https://github.com/Serli/adno" target="_blank" className="github-nav">Github</a></li>
                            <li><a href="mailto:dg@serli.com" className="contact-nav">Contact</a></li>
                        </ul>
                    </div>
                </div>


            </header>

        )
    }
}

export default withRouter(Navbar);