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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Chilled',
  'Spicy',
  'Hot',
  'Drink',
  'Sweet',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export default function AddFoodItem() {

  const theme1 = useTheme();

  const [itemname, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [addon, setaddon] = useState("");
  const [shopname, setShopName] = useState("");
  const [tags, setTags] = useState([]);
  const [addtag, setAddtag] = useState("");

  const onChangeItemname = (event) => {
    setItemName(event.target.value);
  };

  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const onChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const onChangeShopName = (event) => {
    setShopName(event.target.value);
  };

  const onChangeAddTag = (event) => {
    setAddtag(event.target.value);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const onChangeTags = (event) => {
    setTags( [...tags, {key: tags.length, label: addtag}]);
  };

   const onHandleDelete = (chipToDelete) => () => {
    setTags((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const resetInputs = () => {
    setItemName("");
    setPrice(""); 
    setCategory("");
    setaddon(""); 
    setShopName("");
    setTags([]); 
    setAddtag("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let vendor_id =  localStorage.getItem('id');

    const newitem = {
            itemname: itemname,
            price: price,
            category: category,
            //addon: this.state.addon,
            shopname: shopname,
            tags: tags,
            vendor_id: vendor_id,
            status: "Added",
        };

        axios
          .post("http://localhost:4000/api/user/fooditems",newitem)
          .then(response => {
            alert("Food Item was successfully added to the database");
            console.log(response)
          })
          .catch(function(error) {
              console.log(error);
          })

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
                  <FastfoodIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Food Item
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="itemname"
                    label="Item Name"
                    name="itemname"
                    autoComplete="itemname"
                    value={itemname}
                    onChange = {onChangeItemname}
                    autoFocus
                  />
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="price"
                    label="Price"
                    name="price"
                    autoComplete="price"
                    value={price}
                    onChange = {onChangePrice}
                    autoFocus
                  />
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="category"
                    label="Category (Veg/Non-Veg)"
                    name="category"
                    autoComplete="category"
                    value={category}
                    onChange = {onChangeCategory}
                    autoFocus
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="shopname"
                    label="Shopname"
                    name="shopname"
                    autoComplete="shopname"
                    value={shopname}
                    onChange = {onChangeShopName}
                    autoFocus
                  />
                 
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-name-label">Tags</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={tags}
                      onChange={handleChange}
                      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, tags, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                   Submit
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
)
}
   