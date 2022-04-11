const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Buyer 
const BuyerSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password:{
		type: String,
		required: true,
		minlength: 8
	},
	age:{
		type: String,
		required: true
	},
	contact:{
		type: String,
		required: true
	},
	batch:{
		type: String,
		required: true,
		enum: ['UG1','UG2','UG3','UG4','UG5']
	},
	usertype:{
		type: String
	},
	wallet: {
		type: Number,
		default: 0,
	}
});


//Schema for Vendor
const VendorSchema = new Schema({
	managername: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password:{
		type: String,
		required: true,
		minlength: 8
	},
	contact:{
		type: String,
		required: true
	},
	shopname:{
		type: String,
		required: true,
	},
	openingtime:{
		type: String,
		required: true,	
	},
	closingtime:{
		type: String,
		required: true,
	},
	usertype:{
		type: String
	},
});

// Schema for FoodItems
const FoodSchema = new Schema({
	itemname: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	rating: {
		type: Number,
		default: 0
	},
	num: {
		type: Number,
		default: 0,
	},
	avg: {
		type: Number,
		default: 0,
	},
	category: {
		type: String,
		required: true,
		enum: ['Veg','Non-Veg']
	},
	addon: {
		type: {
			name: String,
			pricing: Number,
		}
	},
	tags: [
		{
			type: String,
			required: true,
		}
	],
	status: {
		type: String,
	},
	shopname: {
		type: String,
	},
	vendor_id: {
		type: Schema.Types.ObjectId,
		ref: "VendorSchema",
	},
	num_sold: {
		type: Number,
		default: 0,
	},
});

//schema for orders
const OrderSchema = new Schema({
	product_id: {
		type: Schema.Types.ObjectId,
		ref: "FoodSchema",
		required: true,
	},
	vendor_id: {
		type: Schema.Types.ObjectId,
		ref: "VendorSchema",
	},
	cust_id: {
		type: Schema.Types.ObjectId,
		ref: "BuyerSchema",
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	rating_flag: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
	},
	time: {
		type: Date,
	},
	status: {
		type: String,
	},
	vendorname: {
		type: String,
	},
	name: {
		type: String,
	},
	price: {
		type: Number,
	},
},
	{timestamps: true}
);


module.exports.Order = mongoose.model("Orders", OrderSchema);
module.exports.Food = mongoose.model("Fooditems", FoodSchema);
module.exports.Buyer = mongoose.model("Buyers", BuyerSchema);
module.exports.Vendor = mongoose.model("Vendors",VendorSchema);