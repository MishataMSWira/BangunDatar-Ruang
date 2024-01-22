import express from "express"
import { createSeats, readSeats } from "../controller/seatsController"
const app = express()

/** allow read to a json from body */
app.use(express.json())

/** address for get event data */
app.get(`/seats`, readSeats)
/** address for add new event */
app.post(`/seats`, createSeats)
/** address for  */



export default app