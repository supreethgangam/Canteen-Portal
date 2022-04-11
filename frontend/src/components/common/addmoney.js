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
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const theme = createTheme();

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));



export default function AddFoodItem() {


  const [money, setMoney] = useState(0);

  const onChangeMoney = (event) => {
    setMoney(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const detail = {
        id: localStorage.getItem('id'),
        money: money,
    }

        axios
          .post("http://localhost:4000/api/user/addmoney",detail)
          .then(response => {
              alert("Added");
            console.log(response);
          })
          .catch(function(error) {
              console.log(error);
          })

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
                  <FastfoodIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add Money
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="itemname"
                    label="Enter money"
                    name="itemname"
                    autoComplete="itemname"
                    value={money}
                    onChange = {onChangeMoney}
                    autoFocus
                  />
                 <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                   ADD
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
    )
}