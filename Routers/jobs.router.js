import express from 'express';
import jobController from '../Controller/jobs.controller.js';
import auth from '../Middleware/auth.js';

const jobRouter = express.Router();

jobRouter.post('/', auth.verifyToken, jobController.createJob);
jobRouter.get('/', auth.verifyToken, jobController.getAllJobs);
jobRouter.get('/:id', auth.verifyToken, jobController.getJob);
jobRouter.put('/:id', auth.verifyToken, jobController.updateJob);
jobRouter.delete('/:id', auth.verifyToken, jobController.deleteJob);

export default jobRouter;
