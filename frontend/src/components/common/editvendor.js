import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import axios from "axios";


const theme = createTheme();

export default function SignUp() {

  const [managername, setManagerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [shopname, setShopName] = useState("");
  const [closingtime, setClosingTime] = useState("");
  const [openingtime, setOpeningTime] = useState("");

  const onChangeManagerName = (event) => {
    setManagerName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
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
    setManagerName("");
    setEmail("");
    setPassword("");
    setContact("");
    setShopName("");
    setOpeningTime("");
    setClosingTime("");
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();

    const editVendor = {
      managername: managername,
      email: email,
      password: password,
      contact: contact,
      shopname: shopname,
      openingtime: openingtime,
      closingtime: closingtime,
      usertype: "vendor",
      id: localStorage.getItem('id'),
    };
    console.log(editVendor)
    axios
      .post("http://localhost:4000/api/user/edit1", editVendor)
      .then((response) => {
        alert("Profile Edited");
        console.log(response.data);
      });

    resetInputs();
  };

  return (
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
            Edit
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
                  value={managername}
                  onChange = {onChangeManagerName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={email}
                  onChange = {onChangeEmail}
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
                  value={password}
                  onChange = {onChangePassword}
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
                  value={contact}
                  onChange = {onChangeContact}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="shopname"
                  label="Shop Name"
                  value={shopname}
                  onChange = {onChangeShopName}
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
                  value={openingtime}
                  onChange = {onChangeOpeningTime}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="closingtime"
                  label="Canteen Closing Time"
                  value={closingtime}
                  onChange = {onChangeClosingTime}
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
              Edit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}