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
    
    const status1 = (event, user) => {
    
        const details = {
          id: user._id,
          st: user.status,
        }
        
        let t1=0;

        items.map((user, ind) => {
          if (user['vendor_id'] === localStorage.getItem('id') && user['status'] === "ACCEPTED") 
          {
              t1++;
          }
        })

        console.log(t1);

        if(t1 === 10)
        {
          alert("Cannot Accept any more than 10 Orders");
        }

        if(t1 < 10)
        {
          axios
          .post("http://localhost:4000/api/user/changestatus",details)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        }
        
        window.location.reload();
    } 

    const status = (event, user) => {
    
      const details = {
        id: user._id,
        st: user.status,
      }
      

        axios
        .post("http://localhost:4000/api/user/changestatus",details)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      
      window.location.reload();
  } 

    const reject = (event, user) => {
    
        const details = {
          id: user._id,
          st: user.status,
        }
    
        axios
          .post("http://localhost:4000/api/user/reject",details)
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
                  <TableCell>Food Item</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((user, ind) => {
                    if (user['vendor_id'] === localStorage.getItem('id') && user['status'] != "PLACED" && user['status'] != "READY FOR PICKUP" && user['status'] != "COMPLETED" && user['status'] != "REJECTED") 
                    {
                        return (
                        <TableRow key={ind}>
                            <TableCell>{ind+1}</TableCell>
                            <TableCell>{user.time}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.quantity}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={e => status(e,user)}
                                >
                                MOVE TO NEXT STAGE
                                </Button>
                            </TableCell>
                        </TableRow>)
                    }

                    if (user['vendor_id'] === localStorage.getItem('id') && user['status'] === "PLACED")
                    {
                        return (
                            <TableRow key={ind}>
                                <TableCell>{ind+1}</TableCell>
                                <TableCell>{user.time}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.quantity}</TableCell>
                                <TableCell>{user.status}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={e => status1(e,user)}
                                    >
                                    MOVE TO NEXT STAGE
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={e => reject(e,user)}
                                    >
                                    REJECT
                                    </Button>
                                </TableCell>
                            </TableRow>)
                    }

                    if (user['vendor_id'] === localStorage.getItem('id') && (user['status'] === "READY FOR PICKUP" || user['status'] === "COMPLETED" || user['status'] === "REJECTED")) 
                    {
                        return (
                        <TableRow key={ind}>
                            <TableCell>{ind+1}</TableCell>
                            <TableCell>{user.time}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.quantity}</TableCell>
                            <TableCell>{user.status}</TableCell>
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
