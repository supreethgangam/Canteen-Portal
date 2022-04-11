import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Buyer_reg from "./Buyer_reg";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import axios from "axios";

const theme = createTheme();

export default function BasicSelect() {
  const [Age, setage] = React.useState('');

  const handleChange = (event) => {
    setage(event.target.value);
  };

  const [firstname, setFirstName] = useState("");
  const [managername, setManagerName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(null);
  const [contact, setContact] = useState(null);
  const [batch, setBatch] = useState("");
  const [shopname, setShopName] = useState("");
  const [closingtime, setClosingTime] = useState("");
  const [openingtime, setOpeningTime] = useState("");
  
  const onChangeFirstname = (event) => {
    setFirstName(event.target.value);
  };

  const onChangeLastname = (event) => {
    setLastName(event.target.value);
  };

  const onChangeManagerName = (event) => {
    setManagerName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const onChangeShopName = (event) => {
    setShopName(event.target.value);
  };

  const onChangeOpeningTime = (event) => {
    setOpeningTime(event.target.value);
  };

  const onChangeClosingTime = (event) => {
    setClosingTime(event.target.value);
  };

  const resetInputs = () => {
    setFirstName("");
    setLastName("");
    setManagerName("");
    setEmail("");
    setPassword("");
    setAge(null);
    setContact(null);
    setBatch("");
    setShopName("");
    setOpeningTime("");
    setClosingTime("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newBuyer = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      age: age,
      contact: contact,
      batch: batch,
    };
    console.log(newBuyer)
    axios
      .post("http://localhost:4000/api/user/register", newBuyer)
      .then((response) => {
        alert("Created\t" + response.data.firstname);
        console.log(response.data);
      });

    resetInputs();
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();

    const newVendor = {
      managername: managername,
      email: email,
      password: password,
      contact: contact,
      shopname: shopname,
      openingtime: openingtime,
      closingtime: closingtime,
    };
    console.log(newVendor)
    axios
      .post("http://localhost:4000/api/user/register", newVendor)
      .then((response) => {
        alert("Created\t" + response.data.managername);
        console.log(response.data);
      });

    resetInputs();
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="User"
          onChange={handleChange}
        >
          <MenuItem value={10}>Buyer</MenuItem>
          <MenuItem value={20}>Vendor</MenuItem>
        </Select>
      </FormControl>
         { Age === 10 ? (
              <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  OnChange = {onChangeFirstname}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  OnChange = {onChangeLastname}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  OnChange = {onChangeEmail}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  OnChange = {onChangePassword}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="age"
                  label="Age"
                  OnChange = {onChangeAge}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contact"
                  label="Contact Number"
                  OnChange = {onChangeContact}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="batch"
                  label="Batch"
                  OnChange = {onChangeBatch}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
            ):(
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit1} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="ManagerName"
                  required
                  fullWidth
                  id="ManagerName"
                  label="Manager Name"
                  OnChange = {onChangeManagerName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  OnChange = {onChangeEmail}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  OnChange = {onChangePassword}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contact"
                  label="Contact Number"
                  OnChange = {onChangeContact}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="shopname"
                  label="Shop Name"
                  OnChange = {onChangeShopName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="openingtime"
                  required
                  fullWidth
                  id="openingtime"
                  label="Canteen Opening Time"
                  OnChange = {onChangeOpeningTime}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="closingtime"
                  label="Canteen Closing Time"
                  OnChange = {onChangeClosingTime}
                  name="closingtime"
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>)
          }

    </Box>
  );
}



/*import Buyer_reg from "./Buyer_reg";
import Vendor_reg from "./Vendor_reg";

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from '@mui/material/Link';

import { Component } from 'react';

export default class Register extends Component {
  constructor(props) {
      super(props);
      this.onSelect = this.onSelect.bind(this);

      this.state = {
        option: ''
      }
  }

  onSelect(e) {
      console.log(e);
      this.setState({
        option: e
      });
  }

  render(){
    return (
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.option}
          label="User"
          onChange={this.onSelect}
        >
          <MenuItem value={10}>Buyer</MenuItem>
          <MenuItem value={20}>Vendor</MenuItem>
        </Select>
         {this.state.option === "" ? '' : (this.state.option === "Buyer" ? <Buyer_reg/> : <Vendor_reg/>)}
      </FormControl>
    </Box>
    )
  }

}*/

