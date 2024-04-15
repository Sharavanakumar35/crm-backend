import User from '../Models/user.schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../utils/config.js';

const userController = {
    signup: async (request, response) => {
        try {
            const { username, password, name, location } = request.body;
            const user = await User.findOne({ username });
            if (user) {
                return response.status(400).json({ message: 'User already exists' });
            }
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new User({ username, passwordHash, name, location });
            const savedUser = await newUser.save();
            response.json({ message: 'User created', user: {
                username: savedUser.username,
                name: savedUser.name,
                location: savedUser.location,
                role: savedUser.role,
            } });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    signin: async (request, response) => {
        try {
            const { username, password } = request.body;
            const user = await User.findOne({ username });
            if (!user) {
                return response.status(400).json({ message: 'User not found' });
            }
            const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
            if (!passwordCorrect) {
                return response.status(400).json({ message: 'Invalid password' });
            }
            const token = jwt.sign({
                username: user.username,
                id: user._id,
                name: user.name,
            }, config.JWT_SECRET);
            response.cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
                secure: true,
            });
            response.json({ message: 'User logged in', token });
        } catch(error) {
            response.status(500).json({ message: error.message });
        }
    },

    getUser: async (request, response) => {
        try {
            const userId = request.userId;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if (!user) {
                return response.status(400).json({ message: 'User not found' });
            }
            response.json({ message: 'User found', user });
        } catch(error) {
            response.status(500).json({ message: error.message });
        }
    },

    logout: async (request, response) => {
        try {
            response.clearCookie('token');
            response.json({ message: 'User logged out' });
        } catch(error) {
            response.status(500).json({ message: error.message });
        }
    },
};

export default userController;
