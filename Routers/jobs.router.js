import express from 'express';
import jobController from '../Controller/jobs.controller.js';
import auth from '../Middleware/auth.js';

const jobRouter = express.Router();

// Define the endpoints
jobRouter.post('/', auth.verifyToken, jobController.createJob);
jobRouter.get('/', auth.verifyToken, jobController.getAllJobs);
jobRouter.get('/:id', auth.verifyToken, jobController.getJob);

// Export the router
export default jobRouter;
