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
    const [placed, setPlaced] = useState();
    const [completed, setCompleted] = useState();
    const [pending, setPending] = useState();
    const [rejected, setRejected] = useState();
    const [five, setFive] = useState([]);
    const [food, setFood] = useState([]);

    const resetInputs = () => {
        setPlaced(0);
        setCompleted(0);
        setPending(0);
        setRejected(0);
      };
    

    useEffect(() => {
        
        let t1=0,t2=0,t3=0,t4=0;
        
        const top = food.filter((item) => item['vendor_id'] === localStorage.getItem('id'))

        top.sort((a,b) => {if(a.num_sold != undefined && b.num_sold != undefined) {return (b.num_sold - a.num_sold)}})

        setFive(top);

        items.map((user, ind) => {
            if (user['vendor_id'] === localStorage.getItem('id')) 
            {
                t1++;
            }
            if (user['vendor_id'] === localStorage.getItem('id') && user['status'] === "PLACED" && user['status'] === "READY FOR PICKUP" && user['status'] === "COOKING" && user['status'] === "ACCEPTED")  
            {
                t2++;
            }
            if (user['vendor_id'] === localStorage.getItem('id') && user['status'] === "COMPLETED") 
            {
                t3++;
            }
            if (user['vendor_id'] === localStorage.getItem('id') && user['status'] === "REJECTED") 
            {
                t4++;
            }
        })
        setPlaced(t1);
        setPending(t2);
        setCompleted(t3);
        setRejected(t4);
 
        axios
        .get("http://localhost:4000/api/user/orderfood")
        .then((response) => {
          console.log(response.data);
          setItems(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
        
        axios
        .get("http://localhost:4000/api/user/allfooditems")
        .then((response) => {
          console.log(response.data);
          setFood(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      
    }, [food]);
    
    
    return (
    <div>
      <h3>Statistics</h3>
      <Grid container>  
        <Grid item xs={12} >
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Orders Placed</TableCell>
                  <TableCell>Pending Orders</TableCell>
                  <TableCell>Completed Orders</TableCell>
                  <TableCell>Rejected Orders</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              

                        <TableRow>
                            <TableCell>{placed}</TableCell>
                            <TableCell>{pending}</TableCell>
                            <TableCell>{completed}</TableCell>
                            <TableCell>{rejected}</TableCell>
                        </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <h3>Top Selling Items</h3>
        <Grid item xs={12} >
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Times Sold</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {five.map((item, ind) => {
                    if (ind<5 && item['num_sold'] != 0) 
                    {
                        return (
                        <TableRow key={ind}>      
                            <TableCell>{ind+1}</TableCell>
                            <TableCell>{item.itemname}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.num_sold}</TableCell>
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
