import React, {Component} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

export default class VendorFoodMenu extends Component {
    
    constructor(props) {
        super(props);
        this.state = {items: []};
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    onEdit(e) {
        const itemname = prompt("Item Name");
        const price = prompt("Price");
        const category = prompt("Category (Veg/Non-Veg)");


        const details = {
            itemid: e.target.value,
            price: price,
            category: category,
            itemname: itemname,
        }
    
        axios
          .post("http://localhost:4000/api/user/editfooditem",details)
          .then(res => {
            console.log(res.data)
          })
        
        window.location.reload();
    }

    onDelete(e) {
       
        const detail = {
            itemid: e.target.value
        }
    
        axios
          .post("http://localhost:4000/api/user/deletefooditem",detail)
          .then(res => {
            console.log(res.data)
          })

          window.location.reload();
      }

    componentDidMount() {
        axios.get('http://localhost:4000/api/user/allfooditems')
             .then(response => {
                 this.setState({items: response.data});
                 console.log(this.state.items)
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    
    render() {
        return (
            <div>
                <Button variant="contained" onClick={() => window.location.href = "/addfooditem"}>+ Add Food Item</Button>
                <Grid item xs={12} >
                    <Paper>
                        <Table size="small">
                        <TableHead>
                            <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Category</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.items.map((currentItem, ind) => {
                                if(currentItem['vendor_id'] === localStorage.getItem('id'))
                                return (
                                    <TableRow key={ind}>
                                        <TableCell>{currentItem.itemname}</TableCell>
                                        <TableCell>{currentItem.price}</TableCell>
                                        <TableCell>{currentItem.category}</TableCell>
                                        <TableCell><Button variant="contained" value={currentItem._id} onClick={this.onEdit}>Edit</Button></TableCell>
                                        <TableCell><Button variant="contained" value={currentItem._id} onClick={this.onDelete}>Delete</Button></TableCell>
                                   </TableRow>
                                );
                            })}
                        </TableBody>
                        </Table>
                    </Paper>
                </Grid>
               
            </div>
        )
    }
}