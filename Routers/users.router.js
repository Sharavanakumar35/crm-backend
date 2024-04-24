import express from 'express';
import userController from '../Controller/users.controller.js';
import auth from '../Middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/signup', userController.signup);
userRouter.post('/signin', userController.signin);
userRouter.get('/getUser', auth.verifyToken, userController.getUser);
userRouter.put('/updateUser', auth.verifyToken, userController.updateUser);
userRouter.put('/enableMail', auth.verifyToken, userController.enableMail);
userRouter.get('/logout', userController.logout);

export default userRouter;
