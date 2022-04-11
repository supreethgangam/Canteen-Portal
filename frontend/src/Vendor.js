import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import BuyerNavbar from "./components/templates/BuyerNavbar";
import Vendorprofile from "./components/users/Vendorprofile";
import FoodMenu from "./components/common/VendorFoodMenu"
import VendorDashboard from "./components/common/VendorDashboard"
import Link from '@mui/material/Link';


function Vendor() {
  return (
    <div>
    <Link href="/Vendorprofile">Profile</Link><br/>
    <Link href="/FoodMenu">FoodMenu</Link><br/>
    <Link href="/VendorDashboard">Dashboard</Link><br/>
    <Link href="#">Statistics Page</Link>
    </div>
  );
}

export default Vendor;