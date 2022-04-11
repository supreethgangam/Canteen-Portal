const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "tutorial"

const mongodb_uri = "mongodb+srv://supreeth:Gangam@5@cluster0.lfr9b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
DB =
  mongodb_uri;
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connection established successfully !");
  })
  .catch((err) => {
    console.log("MongoDB database connection error !", err);
  });

// setup API endpoints
app.use("/api/testAPI", testAPIRouter);
app.use("/api/user", UserRouter);


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
