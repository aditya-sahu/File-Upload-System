let mongoose = require('mongoose');

//Scheme of a user
let userSchema = mongoose.Schema({
	userID:{
		type: String,
		required: true
	},
	password:{
		type:String,
		required: true
	},
	email: {
		type:String,
		required: true
	}
});

let User = module.exports = mongoose.model('User',userSchema);
