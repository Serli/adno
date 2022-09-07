import React, { Component } from "react";
import {
    Router,
    Switch,
    Route,
    HashRouter
} from "react-router-dom";

import About from "./components/About";

import history from "../Utils/history";

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar/Navbar";
import HomeWithoutProjects from "./components/HomeWithoutProjects/HomeWithoutProjects";
import HomeWithProjects from "./components/HomeWithProjects/HomeWithProjects";
import NewProject from "./components/NewProject/NewProject";
import Viewer from "./components/Viewer/Viewer";
import Editor from "./components/Editor/Editor";
import Example from "./components/Example/Example";
import Footer from "./components/Footer/Footer";
import LegalNotice from "./components/LegalNotice/LegalNotice";
import CGU from "./components/CGU/CGU";
import { insertInLS } from "../Utils/utils";
import LandingPage from "./components/LandingPage/LandingPage";
import NotFound from "./components/NotFound/NotFound";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isProjects: false
        }
    }

    componentDidMount() {
        if (localStorage.getItem("adno_projects") === undefined || localStorage.getItem("adno_projects") === null) {

            var projects = []

            insertInLS("adno_projects", JSON.stringify(projects))

            this.setState({ isProjects: false })

        } else if (JSON.parse(localStorage.getItem("adno_projects")).length < 1) {
            this.setState({ isProjects: false })
        } else {
            this.setState({ isProjects: true })
        }
    }

    render() {
        return (
            <div>
                <HashRouter history={history}>
                <Navbar showNav={this.state.isProjects} />

                    <Switch>
                        <Route exact path="/about">
                            <About />
                        </Route>

                        <Route exact path="/new">
                            <NewProject />
                        </Route>

                        <Route exact path="/project/:id">
                            <Viewer />
                        </Route>

                        <Route exact path="/edit/:id">
                            <Editor />
                        </Route>

                        <Route exact path="/example">
                            <Example />
                        </Route>

                        <Route exact path="/cgu">
                            <CGU />
                        </Route>

                        <Route exact path="/legal">
                            <LegalNotice />
                        </Route>

                        <Route exact path="/">
                            {
                                this.state.isProjects ?
                                    <HomeWithProjects />
                                    : <LandingPage />
                            }
                        </Route>

                        <Route>
                            <NotFound />
                        </Route>

                    </Switch>
                    <Footer showFooter={this.state.isProjects} />

                </HashRouter>

            </div>
        );
    }

}
