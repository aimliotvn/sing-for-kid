import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
// import Restaurant from './components/Restaurant'
import VideoDetail from './components/VideoDetail'
import "./styles.css";
import SideBar from "./sidebar";

function App() {
    return (
        <div id="App">
            <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            <Switch>
                <Route path='/:id' component={VideoDetail} />
                <Route exact path="/" component={() => <Redirect to="/j7r2ycpnu8k" />}/>
            </Switch>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, rootElement);