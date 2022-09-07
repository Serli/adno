import { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import "./Navbar.css"

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log(this.props)
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
                            <li><Link to="/" className={this.props.history.location.pathname === "/" ? "nav-active" : "adno-nav-item"}>Accueil</Link></li>
                            <li><Link to="/about" className={this.props.history.location.pathname === "/about" ? "nav-active" : "adno-nav-item"}>A propos</Link></li>
                            <li><Link to="/example" className={this.props.history.location.pathname === "/example" ? "nav-active" : "adno-nav-item"}>Exemples</Link></li>
                            {/* <li><a href="http://localhost:3000/docs" className={history.location.pathname === "/manual" ? "nav-active" : "adno-nav-item"}>Mode d'emploi</a></li> */}

                            <li><a href="https://github.com/adnodev/adnodev.github.io" target="_blank" className="github-nav">Github</a></li>
                            <li><a href="mailto:thierry.pasquier@emf.ccsti.eu" className="contact-nav">Contact</a></li>
                        </ul>
                    </div>
                </div>


            </header>

        )
    }
}

export default withRouter(Navbar);