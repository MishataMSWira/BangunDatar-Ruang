import express from "express"
import { createSeats, deleteSeats, readSeats, updateSeats } from "../controller/seatsController"
const app = express()

/** allow read to a json from body */
app.use(express.json())

/** address for get seats data */
app.get(`/seats`, readSeats)
/** address for add new seats */
app.post(`/seats`, createSeats)
/** address for update seats*/
app.put(`/seats/:seatID`,updateSeats)
/** address for delete seats */
app.delete(`/seats/:seatID`, deleteSeats)



export default app