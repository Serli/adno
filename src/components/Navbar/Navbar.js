import { Component } from "react";
import { Link } from "react-router-dom";

import history from "../../../Utils/history"

import "./Navbar.css"

class Navbar extends Component {
    render() {
        return (
            // <header className="p-3 text-bg-dark">
            //     <div className="container">
            //         <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            // <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            //     <li><a href="/" className="nav-link px-2 text-secondary">Accueil</a></li>
            //     <li><a href="/about" className="nav-link px-2 text-white">À propos</a></li>
            //     <li><a href="/example" className="nav-link px-2 text-white">Exemples</a></li>
            //     <li><a href="/manual" className="nav-link px-2 text-white">Mode d'emploi</a></li>
            // </ul>

            //             <div className="text-end">
            //                 <button type="button" className="btn btn-outline-light me-2" id="goto-github">Github</button>
            //                 <button type="button" className="btn btn-warning" id="goto-email">Contact</button>
            //             </div>
            //         </div>
            //     </div>
            // </header>


            <header className="adno-navbar">
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

export default Navbar;