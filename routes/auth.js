const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const Users = require('../models/users');

router.get('', (req, res) => {
	res.json('get request success');
});

router.post('/signup', (req, res) => {
	console.log(req.body);
	let email = req.body.email;
	let password = req.body.password;
	
	if(!email|| !password ) {
		res.status(422).json({"error":"please fill all the fields"});
	}
	
	else {
		Users.findOne({email: email})
		.then(  existingUser  => {
			
			
		  if(existingUser) {
			  return res.json({"error": "email already exists"});
		  }
		  
		  else {
		  bcrypt.hash(password, saltRounds)
		   .then(hashedPassword => {
				 let usersDetails = new Users({
					email,
					password: hashedPassword	
			 })
			 
		  usersDetails.save()
			   .then( usersDetails => {
				   console.log('userdetails',usersDetails)
					return  res.json({"message": "saved successfully"})
				})
				   
			   .catch( err => {
				   console.log(err);
			   })
			}); 
		  
		  }
		})
			
		.catch( err => {
		   console.log(err);
	  } )
	}
});


router.post('/login', (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	
	Users.findOne({email: email})
	 .then( existingUser => {
		 if(!existingUser) {
			 return res.json({"error": "Invalid Email or Password"});
		 }
		 else {
			 bcrypt.compare(password,existingUser.password)
			  .then( validPassword => {
				  if( validPassword ) {
					return res.json({"message":"User Login Successfully"})  
				  }
				  else {
					  return res.json({"error": "Invalid Email or Password"});
				  }
			  })
			  .catch(err => {
				  console.log(err);
			  })
		 }
	 }  )
	 .catch( err => {
		 console.log(err);
	 })
})
module.exports = router;