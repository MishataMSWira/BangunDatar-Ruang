import express from "express"
import { createTickets, readTickets } from "../controller/ticketsController"
const app = express()

/** allow read to a json from body */
app.use(express.json())

/** address for get event data */
app.get(`/tickets`, readTickets)
/** address for add new event */
app.post(`/tickets`, createTickets)
/** address for  */



export default app