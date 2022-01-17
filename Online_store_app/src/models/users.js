import mongoose from 'mongoose';

// schema for product
const userSchema = new mongoose.Schema({
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
        required: true
    },
    role: {
        type: String,
        required: true,
        enum:["customer","admin"],
        default:"customer"
    },
   
});

// register the model
mongoose.model( 'User', userSchema );