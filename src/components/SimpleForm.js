import React, { Component } from "react";
import axios from 'axios';
import uuid4 from 'uuid4';
import "./SimpleForm.css";
import SelectOption from "./SelectOption.js";
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
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { firstName, lastName, email, states } = this.state;
    let params = {
      "id": "usr-" + uuid4(),
      "firstName": `${firstName}`,
      "lastName": `${lastName}`,
      "email": `${email}`,
      "states": `${states}`
    }
    await axios(
      {
        method: 'post',
        url: config.endpoint,
        data: params
      }
      ).then(function(data){
          console.log("Adding data into db ...");
    }).catch(function(error){
          console.log(error);
    });
  }

  render() {
    let selectOption = [];
    let stateList = ['NSW', 'VIC', 'WA', 'SA', 'TAS', 'QLD', 'NT', 'LALALA'];
    stateList.map((element)=>{
      selectOption.push(<SelectOption stateValue={element} />);
    })
    return (
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
            {selectOption}
          </select>
          <button type="submit">Send</button>
        </form>
    );
  }
}