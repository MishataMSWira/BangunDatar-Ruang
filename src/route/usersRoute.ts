import express from "express"
import { createUsers, deleteUsers, loginUser, readUsers, updateUsers } from "../controller/usersController"
import { verifyUser } from "../middleware/verifyUser"
const app = express()

/** allow read to a json from body */
app.use(express.json())

/** address for get users data */
app.get(`/users`, verifyUser,readUsers)
/** address for add new users */
app.post(`/users`, verifyUser,createUsers)
/** address for update users */
app.put(`/users/:userID`, verifyUser,updateUsers)
/** address for delete users */
app.delete(`/users/:userID`, verifyUser,deleteUsers)
/** address for Login Users */
app.post(`/users/login`, loginUser)



export default app