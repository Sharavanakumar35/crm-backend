import Ticket from '../Models/ticket.schema.js'


export const getAllTickets = async (req, res) => {
    try {
      const tickets = await Ticket.find({});
      res.status(200).json(tickets);
    } catch (err) {
      res.status(500).json({ message: err });
    }
};

export const getTicketById = async (req, res) => {
    try {
        const {id} = req.params;
        const ticket = await Ticket.findById(id);
        res.status(200).send(ticket);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

export const updateTicketById = async (req, res) => {
    try {
        const {id} = req.params;
        const ticket = await Ticket.findByIdAndUpdate(id, req.body);

        if(!ticket) {
            return res.status(404).json({message: "Ticket not found"});
        }

        const updated_ticket = await Ticket.findById(id);
        res.status(200).send(updated_ticket);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

export const deleteTicketById = async (req, res) => {
    try {
        const {id} = req.params;
        const ticket = await Ticket.findByIdAndDelete(id);
        if(!ticket) {
            return res.status(404).json({message: "Ticket not found"});
        }
        res.status(200).json({message: "Ticket deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error});
    }
}
export const createTicket = async (req, res) => {
    try {

        const ticket = await Ticket.create(req.body);
        res.status(200).send(ticket);
    } catch (error) {
        res.status(500).send(error);
    }
}
