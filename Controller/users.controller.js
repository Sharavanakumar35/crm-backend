import User from '../Models/user.schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../utils/config.js';
import { request, response } from 'express';


const userController = {
    signup: async (request, response) => {
        try {
            const { username, password, phone, email, image, location, role } = request.body;
            const user = await User.findOne({ username });
            if (user) {
                return response.status(400).json({ message: 'User already exists' });
            }
            const permissions = role === 'admin' ? {mail: false, edit: true, delete: true} : {mail: true, edit: false, delete: false};
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new User({ username, passwordHash, phone, email, location, role, image, permissions });
            const savedUser = await newUser.save();
            response.json({ message: 'User created', user: {
                username: savedUser.username,
                email: savedUser.email,
                phone: savedUser.phone,
                image: savedUser.image,
                location: savedUser.location,
                role: savedUser.role,
                permissions: savedUser.permissions,
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
                email: user.email,
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
            const user = await User.findById(userId).select('-passwordHash -__v -_id -pass');
            if (!user) {
                return response.status(400).json({ message: 'User not found' });
            }
            response.json({ message: 'User found', user });
        } catch(error) {
            response.status(500).json({ message: error.message });
        }
    },

    updateUser: async (request, response) => {
        try {
            const userId = request.userId;
            const {username, email, phone, image, location, role, instagramUrl, facebookUrl, twitterUrl} = request.body;
            const updateUser = await User.findByIdAndUpdate(userId, {
                username, 
                email, 
                phone, 
                image, 
                location, 
                role,
                instagramUrl,
                facebookUrl,
                twitterUrl
            }, {new: true});

            if (!updateUser) {
                return response.status(404).json({message: 'User not found'});
            }
            response.status(200).json({message: 'User updated successfully'});

            
        } catch (error) {
            response.status(500).json({message: error.message});
        }
    },

    enableMail: async (request, response) => {
        try {
            const userId = request.userId;
            const {email, pass} = request.body;
            const updateUser = await User.findByIdAndUpdate(userId, {
                email,
                pass,
                permissions: {
                    mail: true,
                    edit: true,
                    delete: true
                }
            }, {new: true});

            response.cookie('pass', pass);
            response.cookie('email', email);

            if (!updateUser) {
                return response.status(404).json({message: 'User not found'});
            }
            response.status(200).json({message: 'Email Pass updated successfully'});

            
        } catch (error) {
            response.status(500).json({message: error.message});
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
