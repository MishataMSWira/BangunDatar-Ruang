import { PrismaClient } from "@prisma/client";
import { Request, Response, response } from "express";
import md5 from "md5";
import { sign } from "jsonwebtoken"


/** create an object of Prisma */
const prisma = new PrismaClient();

/** create a function to "create" new event */
/** asynchronous = fungsi yg berjalan secara paralel */
const createUsers = async (request: Request, response: Response) => {
  try {
    /** read a request from body */
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const email = request.body.email;
    const password = md5(request.body.password);
    const role = request.body.role;

    /** insert to events table using prisma */
    const newData = await prisma.users.create({
      data: {
        firstname,
        lastname,
        email,
        password,
        role
      },
    });

    return response.status(200).json({
      status: true,
      message: `Users has been created`,
      data: newData,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

/** create a function to READ users */
const readUsers = async (request: Request, response: Response) => {
  try {
    const dataUsers = await prisma.users.findMany()
    return response .status(200).json({
        status: true,
        message: `Events has been loaded`,
        data: dataUsers
    })
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

/** function for update seats */
const updateUsers = async (request: Request, response: Response) => {
  try {
    /** read seatID yg that sent from URL */
    const userID = request.params.userID;
    /** read data perubahan */
    const firstname = request.body.firstname
    const lastname = request.body.lastname
    const email = request.body.email
    const password = md5(request.body.password)
    const role = request.body.role

    /** make sure that data has exists */
    const findUsers = await prisma.users.findFirst({
      where: { userID: Number(userID) },
    });

    if (!findUsers) {
      /** give a respon when seats not found */
      return response.status(400).json({
        status: false,
        message: `Data users not found...`,
      });
    }

    const dataUsers = await prisma.users.update({
      where: { userID: Number(userID) },
      data: {
        firstname: firstname || findUsers.firstname,
        lastname: lastname || findUsers.lastname,
        email: email || findUsers.email,
        password: password || findUsers.password,
        role: role || findUsers.role
      },
    });

    return response.status(200).json({
      status: true,
      message: `Users has been updated`,
      data: dataUsers,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

/**create a function to delete event */
const deleteUsers = async (request: Request, response: Response) => {
  try {
    /**get event ID from URL */
    const userID = request.params.userID

    /**make sure that event is exist */
    const findUsers = await prisma.users.findFirst({
      where: { userID: Number(userID)}
    })
    if (!findUsers) {
      /** give a respon when event not found */
      return response.status(400).json({
        status: false,
        message: `Data event not found...`,
      });
    }

    /**execute for delete event */
    const dataUsers = await prisma.users.delete({
      where : {userID: Number(userID)}
    })
    return response.status(200)
    .json({
      status: true,
      message: `Data users has been deleted`
    })

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const loginUser = async (request: Request, response: Response) => {
  try {
    const email = request.body.email
    const password = md5(request.body.password)
    const user = await prisma.users.findFirst(
      {
        where: {
          email: email, 
          password: password
        }
      }
    )
    if (user) {
      const payload = user
      const secretkey = 'akupengencerita'
      const token = sign(payload,secretkey)

      return response.status(200).json({
        status: true, 
        message: "Login Successful 😍",
        token: token
      })
    }
    else {
      return response.status(200).json({
        status: false,
        message: "Login Failed, Try Again"
      })
    }

  } catch (error) {
    return response.status(500).json({
      status: false, message: error
    })
  }
}

export {createUsers, readUsers, updateUsers, deleteUsers, loginUser}