import React, { Component } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default class VendorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      managername: "",
      email: "",
      password: "",
      contact: "",
      shopname: "",
      opentime: "",
      closetime: "",
    };
  }

  componentDidMount() {
    const detail = {
        id: localStorage.getItem('id')
    };

    axios
      .post("http://localhost:4000/api/user/vendorprofile",detail)
      .then(response => {
        console.log(response);
        this.setState({
          managername: response.data.managername,
          email: response.data.email,
          password: response.data.password,
          contact: response.data.contact,
          shopname: response.data.shopname,
          opentime: response.data.openingtime,
          closetime: response.data.closingtime, 
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    }

  render() {
    return (
      <div>
        <Button variant="contained" onClick={() => window.location.href = "/vendorfoodmenu"}>Food Menu</Button>
        <br/><br/>
        <Button
          variant="contained"
          color="primary"
          onClick = {() => window.location.href = "/editvendor"}
        >
        Edit Profile
        </Button>
        <h3>
          Managername{" : "}{this.state.managername}
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
          Contact{" : "} {this.state.contact}
        </h3>
        <br/>
        <h3>
          Shopname{" : "} {this.state.shopname}
        </h3>
        <br/>
        <h3>
          Opening Time{" : "} {this.state.opentime}
        </h3>
        <br/>
        <h3>
          Closing Time{" : "} {this.state.closetime}
        </h3>
        <br/>
      </div>
    );
  }
}