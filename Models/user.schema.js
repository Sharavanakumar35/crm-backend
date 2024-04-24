import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: String,
    email: String,
    pass: {
        type: String,
        default: ''
    },
    phone: String,
    permissions: Object,
    image: String,
    location: {
        type: String,
        default: 'Unknown'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    instagramUrl: {
        type: String,
        default: ''
    },
    facebookUrl: {
        type: String,
        default: ''
    },
    twitterUrl: {
        type: String,
        default: ''
    }
});

const User = mongoose.model('User', userSchema, 'users');

export default User;
