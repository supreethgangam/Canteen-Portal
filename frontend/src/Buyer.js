import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import BuyerNavbar from "./components/templates/BuyerNavbar";
import BuyerProfile from "./components/users/Buyerprofile";
import Link from '@mui/material/Link';


function Buyer() {
  return (
    <div>
    <Link href="/Buyerprofile">Profile</Link><br/>
    <Link href="/users">Dashboard</Link><br/>
    <Link href="#">Favorites</Link><br/>
    <Link href="#">Wallet</Link>
    </div>
  );
}

export default Buyer;

