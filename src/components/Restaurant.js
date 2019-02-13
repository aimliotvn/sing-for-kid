//@flow

import React, { Component } from 'react'
import type { ContextRouter } from 'react-router-dom'
import "../styles.css";

class Restaurant extends Component<ContextRouter, State> {

    constructor(props: ContextRouter) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <div id="page-wrap">
                <h1>Cool Restaurant 🍔🍕</h1>
                <h2>Check out our offerings in the sidebar! {this.props.match.params.id}</h2>
            </div>
        )
    }
}


export default Restaurant
