import React, { Component } from "react";

export default class SelectOption extends Component {
    render() {
        let stateValue = this.props.stateValue;
        return (
            <option value={stateValue}>{stateValue}</option>
        );
    }
}