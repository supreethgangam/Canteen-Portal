import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Buyer_reg from "./Buyer_reg";
import Vendor_reg from "./Vendor_reg"

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
  const [Val, setval] = React.useState('');

  const handleChange = (event) => {
    setval(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Val}
          label="User"
          onChange={handleChange}
        >
          <MenuItem value={10}>Buyer</MenuItem>
          <MenuItem value={20}>Vendor</MenuItem>
        </Select>
      </FormControl>
         { Val === 10 ? <Buyer_reg/> : ''}
         { Val === 20 ? <Vendor_reg/> : ''}
    </Box>
  );
}




