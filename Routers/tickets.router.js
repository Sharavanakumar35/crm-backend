import express from 'express';

import { TicketController } from '../Controller/ticket.controller.js';

const router = express.Router();


router.get('/', (req, res)=>{
    res.status(200).send("Welcome to CRM")
})
router.get('/tickets', TicketController.getAllTickets);
router.get('/tickets/:id', TicketController.getTicketById);
router.put('/tickets/:id', TicketController.updateTicketById);
router.delete('/tickets/:id', TicketController.deleteTicketById);
router.post('/tickets', TicketController.createTicket);

export default router;
