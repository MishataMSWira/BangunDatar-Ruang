import express from "express"
import { createUsers, deleteUsers, loginUser, readUsers, updateUsers } from "../controller/usersController"
const app = express()

/** allow read to a json from body */
app.use(express.json())

/** address for get users data */
app.get(`/users`, readUsers)
/** address for add new users */
app.post(`/users`, createUsers)
/** address for update users */
app.put(`/users/:userID`, updateUsers)
/** address for delete users */
app.delete(`/users/:userID`, deleteUsers)
/** address for Login Users */
app.post(`/users/login`, loginUser)



export default app