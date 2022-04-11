import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [money,setMoney] = useState();

  const details = {
    id: localStorage.getItem('id'),
  }

  useEffect(() => {
  if(localStorage.getItem('type') === 'Buyer')
  {
    axios
      .post("http://localhost:4000/api/user/wallet",details)
      .then((response) => {
        console.log(response.data);
        setMoney(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
},[]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
           { localStorage.getItem('type') === 'Buyer' ? (
                <>
                <Button color="inherit" onClick={() => navigate("/buyerdashboard")}>
                  Dashboard
                </Button>
                <Button color="inherit" onClick={() => navigate("/register")}>
                  Register
                </Button>
                <Button color="inherit" onClick={() => navigate("/buyerprofile")}>
                  My Profile
                </Button>
                <Button color="inherit" onClick={() => navigate("/myorders")}>
                  My Orders
                </Button>
                <Button color="inherit" onClick={() => navigate("/addmoney")}>
                  Wallet
                </Button>
                {money}₹
                </>
                ):(
                  <>
                  <Button color="inherit" onClick={() => navigate("/vendordashboard")}>
                    Dashboard
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/vendorfoodmenu")}>
                    MyFoodMenu
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/register")}>
                    Register
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/vendorprofile")}>
                    My Profile
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/statistics")}>
                    Statistics
                  </Button>
                  </>
                )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
