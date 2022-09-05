import React, { Component } from "react";
import {
    Router,
    Switch,
    Route
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
import { insertInLS } from "../Utils/utils";

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
                <Navbar />
                <Router history={history}>
                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>

                        <Route path="/new">
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


                        <Route path="/">
                            {
                                this.state.isProjects ?
                                    <HomeWithProjects />
                                    : <HomeWithoutProjects />
                            }
                        </Route>

                    </Switch>
                </Router>

                <Footer />
            </div>
        );
    }

}
