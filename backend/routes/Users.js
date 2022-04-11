var express = require("express");
var router = express.Router();

// Load User model
const Model = require("../models/Users");
//const Food = require("../models/FoodItems")
//const Vendor = require("../models/Vendor")

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

//GET request
//for getting food items to buyer dashboard
/*router.get("/buyerdashboard", function(req, res) {
    Model.Food.find({}, function(err, item) {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.json(item);
        }
    });
});*/

//POST request
//for wallet
router.post("/wallet", function(req, res) {
    
    const id = req.body.id;
    Model.Buyer.findOne({ _id:id }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200).json(user.wallet);
        }
    });
    
});


//GET request
//for getting food items in foodmenu
router.get("/allfooditems", function(req, res) {
    Model.Food.find({}, function(err, item) {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.json(item);
        }
    });
});

//GET request
//for myorders page
router.get("/orderfood", function(req, res) {
    Model.Order.find({}, function(err, item) {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.json(item);
        }
    });
});

//POST request
//add money
router.post("/addmoney", function(req, res) {
    //Food.find
    const id = req.body.id;
    const money = req.body.money;


    Model.Buyer.findById(id, function(err,rr){
        if(err || rr==null)
        {
            res.status(400).send("Error");
        }
        else
        {
            total = parseFloat(rr.wallet) + parseFloat(money);
            console.log(total);
            Model.Buyer.findByIdAndUpdate(id,{wallet: Math.abs(total)}).then(
                res.status(200)
            )
            .catch(err => {
                res.status(400).send('Error');
            })
        }
    });

});


//POST request
//edit food item
router.post("/editfooditem", function(req, res) {
    //Food.find
    const id = req.body.itemid;
    const itemname = req.body.itemname;
    const price = req.body.price;
    const category = req.body.category;

    console.log(id);

    Model.Food.findByIdAndUpdate(id,{itemname: itemname,price: price,category: category}).then(
        res.status(200)
    )
    .catch(err => {
        res.status(400).send('Error');
    })
});


//POST request
//for rating
router.post("/rating", function(req, res) {
    //Food.find
    const id = req.body.product_id;
    console.log(id);
    const rating = req.body.rating;
    const idd = req.body.order_id;
    let rt = 0;
    let total = 0;

    Model.Food.findById(id, function(err,rr){
        if(err || rr==null)
        {
            res.status(400).send("Error");
        }
        else
        {
            rt = parseFloat(rr.rating) + parseFloat(rating);
            total = parseFloat(rr.num) + 1;
            console.log(total);
            Model.Food.findByIdAndUpdate(id,{rating: parseFloat(rr.rating) + parseFloat(rating),num: parseFloat(rr.num) + 1,avg:  Math.abs(rt/total)}).then(
                res.status(200)
            )
            .catch(err => {
                res.status(400).send('Error');
            })
        }
    });


    Model.Order.findById(idd, function(err,rr){
        if(err || rr==null)
        {
            res.status(400).send("Error");
        }
        else
        {
            Model.Order.findByIdAndUpdate(idd,{rating: Math.abs(rt/total)}).then(
                res.status(200)
            )
            .catch(err => {
                res.status(400).send('Error');
            })
        }
    });
});

//POST request
//edit buyer profile
router.post("/edit", function(req, res) {
    //Food.find
    const id = req.body.id;
    console.log(id);
    const editUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        contact: req.body.contact,
        batch: req.body.batch,
        usertype: req.body.usertype,
    };
    
    Model.Buyer.findByIdAndUpdate(id, editUser).then(
        res.status(200)
    )
    .catch(err => {
        res.status(400).send('Error');
    })
});

//POST request
//edit vendor profile
router.post("/edit1", function(req, res) {
    //Food.find
    const id = req.body.id;
    console.log(id);
    const editUser = {
        managername: req.body.managername,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
        shopname: req.body.shopname,
        openingtime: req.body.openingtime,
        closingtime: req.body.closingtime,
        usertype: req.body.usertype,
    };
    
    Model.Vendor.findByIdAndUpdate(id, editUser).then(
        res.status(200)
    )
    .catch(err => {
        res.status(400).send('Error');
    })
});

//POST request
//for a completed order (after picking up)
router.post("/completed", function(req, res) {
    //Food.find
    const id = req.body.id;
    const status = req.body.st;
    console.log(id);
   
    Model.Order.findByIdAndUpdate(id,{
        $set : {'status':'COMPLETED'}
    }).then(
        res.status(200)
    )
    .catch(err => {
        res.status(400).send('Error');
    })
});


//POST request
//for changing order status
router.post("/changestatus", function(req, res) {
    //Food.find
    const id = req.body.id;
    const status = req.body.st;
    console.log(id);
    if(status === "PLACED")
    {
        Model.Order.findByIdAndUpdate(id,{
            $set : {'status':'ACCEPTED'}
        }).then(
            res.status(200)
        )
        .catch(err => {
            res.status(400).send('Error');
        })
    }
    if(status === "ACCEPTED")
    {
        Model.Order.findByIdAndUpdate(id,{
            $set : {'status':'COOKING'}
        }).then(
            res.status(200)
        )
        .catch(err => {
            res.status(400).send('Error');
        })
    }
    if(status === "COOKING")
    {
        Model.Order.findByIdAndUpdate(id,{
            $set : {'status':'READY FOR PICKUP'}
        }).then(
            res.status(200)
        )
        .catch(err => {
            res.status(400).send('Error');
        })
    }
});

//POST request
//for rejecting order
router.post("/reject", function(req, res) {
    //Food.find
    const id = req.body.id;
    const status = req.body.st;
    console.log(id);
   
    Model.Order.findByIdAndUpdate(id,{
        $set : {'status':'REJECTED'}
    }).then(
        res.status(200)
    )
    .catch(err => {
        res.status(400).send('Error');
    })
});

//POST request
//for changing num_sold
router.post("/changesold", function(req, res) {
    //Food.find
    const id = req.body.product_id;
   
    let sold = 0;

    Model.Food.findById(id, function(err,rr){
        if(err || rr==null)
        {
            res.status(400).send("Error");
        }
        else
        {
            sold = parseFloat(rr.num_sold)+1;
            console.log(sold);
            Model.Food.findByIdAndUpdate(id,{num_sold: sold}).then(
                res.status(200)
            )
            .catch(err => {
                res.status(400).send('Error');
            })
        }
    });
});

//POST request
//for ordering food item 
router.post("/orderfood", function(req, res) {

    const id = req.body.id;
    const p = parseFloat(req.body.price);
    const q = parseFloat(req.body.quantity);
    let val = Math.abs(p*q);

    Model.Buyer.findById(id, function(err,rr){
        if(err || rr==null)
        {
            res.status(400).send("Error");
        }
        else
        {
            total = parseFloat(rr.wallet) - parseFloat(val);
            console.log(total);
            Model.Buyer.findByIdAndUpdate(id,{wallet: Math.abs(total)}).then(
                res.status(200)
            )
            .catch(err => {
                res.status(400).send('Error');
            })
        }
    });


    const newUser = new Model.Order({
        product_id: req.body.product_id,
        cust_id: req.body.cust_id,
        vendor_id: req.body.vendor_id,
        quantity: req.body.quantity,
        status: req.body.status,
        vendorname: req.body.vendorname,
        name: req.body.name,
        price: req.body.price,
        //time: req.body.time,
    });
    console.log(newUser)
    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});


//POST request
//for deleting food item
router.post("/deletefooditem", function(req, res) {
    //Food.find
    const id = req.body.itemid;
    console.log(id);
    Model.Food.findByIdAndDelete(id).then(
        res.status(200)
    )
    .catch(err => {
        res.status(400).send('Error');
    })
    
});


//POST request
//for saving food items
router.post("/fooditems", function(req, res) {
    //Food.find
    const newUser = new Model.Food({
        itemname: req.body.itemname,
        price: req.body.price,
        category: req.body.category,
        //addon: req.body.addon,
        shopname: req.body.shopname,
        tags: req.body.tags,
        vendor_id: req.body.vendor_id,
        status: req.body.status,
    });
    console.log(newUser)
    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

//POST request
//for vendor profile
router.post("/vendorprofile", function(req, res) {
    const id = req.body.id;
    console.log(id);
    Model.Vendor.findOne({ _id:id }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200).json(user);
        }
    });
});

//POST request
//for buyer profile
router.post("/buyerprofile", function(req, res) {
    const id = req.body.id;
    console.log(id);
    Model.Buyer.findOne({ _id:id }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200).json(user);
        }
    });
});
// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a buyer to db
router.post("/register", (req, res) => {
    const newUser = new Model.Buyer({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        contact: req.body.contact,
        batch: req.body.batch,
        usertype: req.body.usertype,
    });
    console.log(newUser)
    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Add a vendor to db
router.post("/register1", (req, res) => {
    const newUser = new Model.Vendor({
        managername: req.body.managername,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
        shopname: req.body.shopname,
        openingtime: req.body.openingtime,
        closingtime: req.body.closingtime,
        usertype: req.body.usertype,
    });
    console.log(newUser)
    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Buyer Login
router.post("/login", (req, res) => {
	const email = req.body.email;
    const password = req.body.password;
    const usertype = req.body.usertype;
	// Find user by email
    console.log(email)
    if(usertype === "Buyer")
	{
        Model.Buyer.findOne({ email }).then(user => {
		    // Check if user email exists
		    if (!user) {
			    return res.status(404).json({
				    error: "Email not found",
			    });
            }
            else if (user.password === password){
                //res.send("Email Found")
                res.status(200).send(user._id);
                //return user;
            }
            else {
                res.status(404).json({
                    error: "Password Incorrect",
                });
            }
	    });
    }
    else
    {
        Model.Vendor.findOne({ email }).then(user => {
		    // Check if user email exists
		    if (!user) {
			    return res.status(404).json({
				    error: "Email not found",
			    });
            }
            else if (user.password === password){
                //res.send("Email Found")
                res.status(200).send(user._id);
                //return user;
            }
            else {
                res.status(404).json({
                    error: "Password Incorrect",
                });
            }
	    });
    }
});

module.exports = router;