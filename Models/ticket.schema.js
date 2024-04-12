import mongoose from "mongoose";

const Ticket_Scheme = mongoose.Schema({
   name: {
    type: String,
    required: [true, "Please enter ticket name"]
   },
},{timestamps: true})

const Ticket = mongoose.model('Ticket', Ticket_Scheme);

export default Ticket;