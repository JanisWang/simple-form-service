import React, { Component } from "react";
import axios from 'axios';
import uuid4 from 'uuid4';
import "./SimpleForm.css";
import config from "../config.json"

export default class SimpleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      states: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
    console.log(this.state);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { firstName, lastName, email, states } = this.state;
    await axios.post(
      config.endpoint,
      {
        "id": "usr-" + uuid4(),
        "firstName": `${firstName}`,
        "lastName": `${lastName}`,
        "email": `${email}`,
        "states": `${states}`
      }
    );
  }

  render() {
    return (
      <div>
        <form className="simpleForm" onSubmit={this.handleSubmit}>
          <label><div className="sfAsterix">*</div>FirstName:</label>
          <input className="sfInput" type="text" name="firstName" onChange={this.handleChange} value={this.state.firstName} maxLength="50" required />
          <label><div className="sfAsterix">*</div>LastName:</label>
          <input className="sfInput" type="text" name="lastName" onChange={this.handleChange} value={this.state.lastName} maxLength="50" required />
          <label><div className="sfAsterix">*</div>Email:</label>
          <input className="sfInput" type="email" name="email" onChange={this.handleChange} value={this.state.email} maxLength="255" required />
          <label><div className="sfAsterix">*</div>State: </label>
          <select className="sfInput" name="states" onChange={this.handleChange} required >
            <option value=''>-</option>
            <option value='NSW'>NSW</option>
            <option value='VIC'>VIC</option>
            <option value='WA'>WA</option>
            <option value='SA'>SA</option>
            <option value='TAS'>TAS</option>
            <option value='QLD'>QLD</option>
            <option value='NT'>NT</option>
          </select>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}