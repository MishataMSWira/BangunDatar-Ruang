import express from "express"
import { createTickets, deleteTickets, readTickets, updateTickets } from "../controller/ticketsController"
const app = express()

/** allow read to a json from body */
app.use(express.json())

/** address for get tickets data */
app.get(`/tickets`, readTickets)
/** address for add new tickets */
app.post(`/tickets`, createTickets)
/** address for update tickets*/
app.put(`/tickets/:ticketID`, updateTickets)
/** address for delete tickets */
app.delete(`/tickets/:ticketID`, deleteTickets)



export default app