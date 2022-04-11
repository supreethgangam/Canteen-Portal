import React, { Component } from "react";
import axios from "axios";
import Button from '@mui/material/Button';

export default class BuyerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      age: "",
      contact: "",
      batch: "",
    };
  }

  componentDidMount() {
    const detail = {
      id: localStorage.getItem('id')
    };

    axios
      .post("http://localhost:4000/api/user/buyerprofile",detail)
      .then(response => {
        console.log(response);
        this.setState({
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
          password: response.data.password,
          age: response.data.age,
          contact: response.data.contact,
          batch: response.data.batch,
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    }

  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick = {() => window.location.href = "/editbuyer"}
        >
        Edit Profile
        </Button>
        <h3>
          Firstname{" : "}{this.state.firstname}
        </h3>
        <br/>
        <h3>
          Lastname{" : "} {this.state.lastname}
        </h3>
        <br/>
        <h3>
          Email{" : "} {this.state.email}
        </h3>
        <br/>
        <h3>
          Password{" : "} {this.state.password}
        </h3>
        <br/>
        <h3>
          Age{" : "} {this.state.age}
        </h3>
        <br/>
        <h3>
          Contact Number{" : "} {this.state.contact}
        </h3>
        <br/>
        <h3>
          Batch{" : "} {this.state.batch}
        </h3>
        <br/>
      </div>
    );
  }
}