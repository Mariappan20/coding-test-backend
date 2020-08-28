const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
	email: { 
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	dob: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	image: {
		type: String,
		
	},

});

module.exports = mongoose.model("Users", usersSchema );