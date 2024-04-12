import express from 'express';

import { getAllTickets, createTicket, getTicketById, updateTicketById, deleteTicketById } from '../Controller/ticket.controller.js';
const router = express.Router();
router.get('/', (req, res)=>{
    res.status(200).send("Welcome to CRM")
})
router.get('/tickets', getAllTickets);
router.get('/tickets/:id', getTicketById);
router.put('/tickets/:id', updateTicketById);
router.delete('/tickets/:id', deleteTicketById);
router.post('/tickets', createTicket);
export default router;
