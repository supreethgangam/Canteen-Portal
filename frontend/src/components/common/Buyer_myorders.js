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

const UsersList = (props) => {
  
    const [items, setItems] = useState([]);
    

    useEffect(() => {
        axios
          .get("http://localhost:4000/api/user/orderfood")
          .then((response) => {
            console.log(response.data);
            setItems(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }, []);
    
    const status = (event, user) => {
    
        const details = {
          id: user._id,
          st: user.status,
        }
    
        axios
          .post("http://localhost:4000/api/user/completed",details)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        
        window.location.reload();
    } 

    const rate = (event, user) => {
      const rat = prompt("Enter Rating");

      const details = {
        rating: rat,
        product_id: user.product_id,
        order_id: user._id,
      }

      axios
          .post("http://localhost:4000/api/user/rating",details)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });

      window.location.reload();
    }

    return (
    <div>
      <Grid container>  
        <Grid item xs={12} >
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>Placed Time</TableCell>
                  <TableCell>Vendor Name</TableCell>
                  <TableCell>Food Item</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((user, ind) => {
                    const temp = user.createdAt;
  
                    if (user['cust_id'] === localStorage.getItem('id') && user['status'] != "READY FOR PICKUP" && user['status'] != "COMPLETED") 
                    {
                        return (
                        <TableRow key={ind}>
                            <TableCell>{ind+1}</TableCell>
                            <TableCell>{temp}</TableCell>
                            <TableCell>{user.vendorname}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.quantity}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell>{user.rating}</TableCell>
                        </TableRow>)
                    }

                    if (user['cust_id'] === localStorage.getItem('id') && user['status'] === "READY FOR PICKUP")
                    {
                        return (
                        <TableRow key={ind}>
                            <TableCell>{ind+1}</TableCell>
                            <TableCell>{temp}</TableCell>
                            <TableCell>{user.vendorname}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.quantity}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={e => status(e,user)}
                                >
                                PICKED UP
                                </Button>
                            </TableCell>
                            <TableCell>{user.rating}</TableCell>
                        </TableRow>)   
                    }

                    if (user['cust_id'] === localStorage.getItem('id') && user['status'] === "COMPLETED")
                    {
                      return (
                        <TableRow key={ind}>
                            <TableCell>{ind+1}</TableCell>
                            <TableCell>{temp}</TableCell>
                            <TableCell>{user.vendorname}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.quantity}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell>{user.rating}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={e => rate(e,user)}
                                >
                                RATE
                                </Button>
                            </TableCell>
                        </TableRow>)   
                    }
                }
                )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersList;


