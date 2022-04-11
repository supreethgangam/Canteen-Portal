import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const UsersList = (props) => {
  const [food, setFood] = useState([]);
  const [users, setUsers] = useState([]);
  const [sortedFood, setSortedFood] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [sortRating, setSortRating] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [quantity, setQuantity] = React.useState('');
  const [min,setMin] = React.useState('');
  const [max,setMax] = React.useState('');
  const [veg,setVeg] = useState(true);
  const [nonveg,setNonveg] = useState(true);

  const [filterfood, setFilterfood] = useState([]);

  const onChangetags = (event) => {
    setFilterfood(food.filter(function (item){
      return item.shopname === event.target
    }))
  }

  const onChangeMin = (event) => {
    setMin(event.target.value);
  };

  const onChangeMax = (event) => {
    setMax(event.target.value);
  };

  const names = [
    'Chilled',
    'Spicy',
    'Hot',
    'Drink',
    'Sweet',
  ];

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/allfooditems")
      .then((response) => {
        console.log(response.data);
        setFood(response.data);
        setSortedFood(response.data);
        setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortChange = () => {
    let foodTemp = food;
    const flag = sortName;
    foodTemp.sort((a, b) => {
      if (a.price != undefined && b.price != undefined) {
        return (1 - flag * 2) * ((a.price) - (b.price));
      } else {
        return 1;
      }
    });
    setFood(foodTemp);
    setSortName(!sortName);
  };

  const sortChange1 = () => {
    let foodTemp = food;
    const flag = sortRating;
    foodTemp.sort((a, b) => {
      if (a.avg != undefined && b.avg != undefined) {
        return (1 - flag * 2) * ((a.avg) - (b.avg));
      } else {
        return 1;
      }
    });
    setFood(foodTemp);
    setSortRating(!sortRating);
  };

  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  const order = (event, user) => {
    
    const id = user._id;
    const vendorname = user.shopname;
    const name = user.itemname;
    const price = user.price;
    const vid = user.vendor_id;

    const orderfood = {
      id: localStorage.getItem('id'),
      product_id: id,
      vendor_id: vid,
      cust_id: localStorage.getItem('id'),
      quantity: quantity,
      status: "PLACED",
      vendorname: vendorname,
      name: name,
      price: price,
      //time:  ,
    }

    console.log(orderfood);

    axios
      .post("http://localhost:4000/api/user/orderfood",orderfood)
      .then((response) => {
        console.log(response.data);
        alert("Ordered");
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post("http://localhost:4000/api/user/changesold",orderfood)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    window.location.reload();
  } 

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };
  
  const Veg = (event) => {
    setVeg(event.target.checked)
  };

  const NonVeg = (event) => {
    setNonveg(event.target.checked)
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={customFunction}
            />
          </List>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Price Range
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Min"
                    fullWidth={true}
                    value={min}
                    onChange = {onChangeMin}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Max"
                    fullWidth={true}
                    value={max}
                    onChange = {onChangeMax}
                  />
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem divider>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Veg" onChange={e => Veg(e)}/>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Non-Veg" onChange={e => NonVeg(e)}/>
              </FormGroup>
            </ListItem>
            <Divider />
            <ListItem divider>
              <Autocomplete
                id="combo-box-demo"
                options={names}
                getOptionLabel={(option) => option}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Shops"
                    variant="outlined"
                  />
                )}
              />
            </ListItem>
            <Divider />
            <ListItem divider>
              <Autocomplete
                id="combo-box-demo"
                options={names}
                getOptionLabel={(option) => option}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Tags"
                    variant="outlined"
                  />
                )}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>Food Item</TableCell>
                  <TableCell>Shop</TableCell>
                  <TableCell>
                    Price
                    {" "}
                    <Button onClick={sortChange}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                  </TableCell>
                  <TableCell>
                    Rating
                    {" "}
                    <Button onClick={sortChange1}>
                      {sortRating ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {food.map((user, ind) => {
                  if ((searchText === "") || (searchText != "" && user['itemname'] === searchText) )
                    if (min === '' || user['price'] >= min) 
                      if(max === '' || user['price'] <= max)
                        if((veg && !nonveg && user['category'] === 'Veg')||(nonveg && !veg && user['category'] === 'Non-Veg') || (veg && nonveg) || (!veg && !nonveg))
                          {
                            return (
                            <TableRow key={ind}>
                              <TableCell>{ind+1}</TableCell>
                              <TableCell>{user.itemname}</TableCell>
                              <TableCell>{user.shopname}</TableCell>
                              <TableCell>{user.price}</TableCell>
                              <TableCell>{user.avg}</TableCell>
                              <TableCell>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={quantity}
                                  label="Quantity"
                                  onChange={handleQuantity}
                                >
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
                                  <MenuItem value={4}>4</MenuItem>
                                  <MenuItem value={5}>5</MenuItem>
                                  <MenuItem value={6}>6</MenuItem>
                                  <MenuItem value={7}>7</MenuItem>
                                  <MenuItem value={8}>8</MenuItem>
                                  <MenuItem value={9}>9</MenuItem>
                                  <MenuItem value={10}>10</MenuItem>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick = {e => order(e,user)}
                                >
                                  Order
                                </Button>
                              </TableCell>
                            </TableRow>)
                          }
                })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersList;


