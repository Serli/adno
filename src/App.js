import React, { Component } from "react";
import {
    Switch,
    Route,
    HashRouter
} from "react-router-dom";

// Import utils
import history from "../Utils/history";
import { insertInLS } from "../Utils/utils";

// Import React components
import Navbar from "./components/Navbar/Navbar";
import HomeWithProjects from "./components/HomeWithProjects/HomeWithProjects";
import NewProject from "./components/NewProject/NewProject";
import Viewer from "./components/Viewer/Viewer";
import Editor from "./components/Editor/Editor";
import Example from "./components/Example/Example";
import Footer from "./components/Footer/Footer";
import LegalNotice from "./components/LegalNotice/LegalNotice";
import CGU from "./components/CGU/CGU";
import LandingPage from "./components/LandingPage/LandingPage";
import NotFound from "./components/NotFound/NotFound";
import About from "./components/About/About";

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
        }
    }


    render() {
        return (
            <div>
                <HashRouter history={history}>
                    <Navbar showNav={JSON.parse(localStorage.getItem("adno_projects")) && JSON.parse(localStorage.getItem("adno_projects")).length > 0 ? true : false} />

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
                                JSON.parse(localStorage.getItem("adno_projects")) && JSON.parse(localStorage.getItem("adno_projects")).length > 0 ?
                                    <HomeWithProjects />
                                    : <LandingPage />
                            }
                        </Route>

                        <Route>
                            <NotFound />
                        </Route>

                    </Switch>
                    <Footer showFooter={JSON.parse(localStorage.getItem("adno_projects")) && JSON.parse(localStorage.getItem("adno_projects")).length > 0 ? true : false} />

                </HashRouter>

            </div>
        );
    }

}
