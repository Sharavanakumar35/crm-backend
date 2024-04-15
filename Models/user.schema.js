import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: String,
    name: String,
    location: {
        type: String,
        default: 'Unknown'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
});

const User = mongoose.model('User', userSchema, 'users');

export default User;
