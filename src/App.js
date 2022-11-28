import React, { Component } from "react";
import {
    HashRouter, Route, Switch
} from "react-router-dom";

// Import utils
import history from "../Utils/history";
import { insertInLS } from "../Utils/utils";
import AdnoUrls from "./components/AdnoUrls/AdnoUrls";

// Import React components
import HomeWithProjects from "./components/HomeWithProjects/HomeWithProjects";
import NewProject from "./components/NewProject/NewProject";
import NotFound from "./components/NotFound/NotFound";
import Project from "./components/Project/Project";

require('dotenv').config()

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isProjects: false
        }
    }

    componentDidMount() {
        // When the app load, check if it already exists some projects
        // If not then create the key "adno_projects" with empty array as value
        if (!localStorage.getItem("adno_projects")) {
            insertInLS("adno_projects", JSON.stringify([]))
        }
    }

    render() {
        return (
            <div>
                <HashRouter history={history}>
                    <Switch>
                        <Route exact path="/new">
                            <NewProject />
                        </Route>

                        <Route exact path="/project/:id">
                            <Project />
                        </Route>
                        
                        <Route exact path="/search">
                            <AdnoUrls />
                        </Route>
                        
                        <Route exact path="/">
                            <HomeWithProjects />
                        </Route>

                        <Route>
                            <NotFound />
                        </Route>

                    </Switch>
                </HashRouter>

            </div>
        );
    }

}
