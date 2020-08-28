const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const app = express();
const port = 7000;
const url = "mongodb://localhost/testApp";

app.use(express.json());
app.use(auth);


app.listen(port, () => {
	console.log(`App listening to the port ${port}`);
});

mongoose.connect(url,
 {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
	if(!err) {
		console.log(`Database connected successfully!!`)
	} 
 });