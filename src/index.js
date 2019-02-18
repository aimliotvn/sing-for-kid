import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
// import Restaurant from './components/Restaurant'
import VideoDetail from './components/VideoDetail'
import "./styles.css";
import SideBar from "./sidebar";

function App() {
    return (
        <div id="App" className="right">
            <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            <Switch>
                <Route path='/:id' component={VideoDetail} />
            </Switch>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, rootElement);