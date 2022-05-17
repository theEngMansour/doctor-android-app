const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    speialization: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    workingHours: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

const UserSchema = new Schema({
    name: {
        type : String,
        required: true
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
    userType: {
        type: String,
        enum: ['doctor', 'normal'],
        required: true
    },
    profiles : [      
        ProfileSchema
    ],
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    }
});

// User Model 
const User = mongoose.model('User', UserSchema);
module.exports = User;