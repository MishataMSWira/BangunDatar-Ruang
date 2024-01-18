import express from "express"
import { createEvent, readEvents } from "../controller/eventsController"
const app = express()

/** allow read to a json from body */
app.use(express.json())

/** address for get event data */
app.get(`/event`, readEvents)
/** address for add new event */
app.post(`/event`, createEvent)
/** address for  */



export default app