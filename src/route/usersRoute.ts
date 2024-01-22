import express from "express"
import { createUsers, readUsers } from "../controller/usersController"
const app = express()

/** allow read to a json from body */
app.use(express.json())

/** address for get event data */
app.get(`/users`, readUsers)
/** address for add new event */
app.post(`/users`, createUsers)
/** address for  */



export default app