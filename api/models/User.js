const mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

// Create Schema
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        sports: [{
            type: String,
        }], 
        movies: [{
            type: String,
        }], 
        outdoor: [{
            type: String,
        }],
        indoor: [{
            type: String,
        }],
        cuisines: [{
            type: String,
        }],
        arts: [{
            type: String,
        }],
        personality: [{
            type: String,
        }],
        personalInfo: [{
            type: String,
        }],
        bio: {
            type: String,
        }, 
        candidates: [{ 
            type:String,
        }], 
        matchHistory: [{
            type:String,
        }],

    },
    { strict: false }
);
// methods ======================
// generating a hash

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = User = mongoose.model("User", UserSchema);