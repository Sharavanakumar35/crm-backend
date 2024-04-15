import express from 'express';
import userController from '../Controller/users.controller.js';
import auth from '../Middleware/auth.js';

const userRouter = express.Router();

// Define the endpoints
userRouter.post('/signup', userController.signup);
userRouter.post('/signin', userController.signin);
userRouter.get('/getUser', auth.verifyToken, userController.getUser);
userRouter.get('/logout', userController.logout);

// Export the router
export default userRouter;
