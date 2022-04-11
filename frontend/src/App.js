import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import Buyer from "./Buyer";
import Vendor from "./Vendor";
import VendorProfile from "./components/common/Vendor_profile";
import BuyerProfile from "./components/common/Buyer_profile";
import VendorFoodMenu from "./components/common/VendorFoodMenu";
import AddFoodItem from "./components/common/AddFoodItem";
import BuyerDashboard from "./components/common/Buyer_dashboard";
import Myorders from "./components/common/Buyer_myorders";
import VendorDashboard from "./components/common/VendorDashboard"
import Statistics from "./components/common/statistics"
import EditBuyer from "./components/common/editbuyer"
import EditVendor from "./components/common/editvendor"
import Addmoney from "./components/common/addmoney"

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="buyer" element={<Buyer />} />
          <Route path="vendor" element={<Vendor />} />
          <Route path="vendorprofile" element={<VendorProfile />} />
          <Route path="buyerprofile" element={<BuyerProfile />} />
          <Route path="vendorfoodmenu" element={<VendorFoodMenu />} />
          <Route path="addfooditem" element={<AddFoodItem />} />
          <Route path="buyerdashboard" element={<BuyerDashboard />} />
          <Route path="myorders" element={<Myorders />} />
          <Route path="vendordashboard" element={<VendorDashboard />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="editbuyer" element={<EditBuyer />} />
          <Route path="editvendor" element={<EditVendor />} />
          <Route path="addmoney" element={<Addmoney />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
