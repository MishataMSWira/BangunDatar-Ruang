import { PrismaClient } from "@prisma/client";
import { Request, Response, response } from "express";

/** create an object of Prisma */
const prisma = new PrismaClient();

/** create a function to "create" new event */
/** asynchronous = fungsi yg berjalan secara paralel */
const createTickets = async (request: Request, response: Response) => {
  try {
    /** read a request from body */
    const eventID = request.body.eventID;
    const userID = request.body.userID;
    const seatID = request.body.seatID;
    const bookedDate = request.body.bookedDate;

    /** insert to events table using prisma */
    const newData = await prisma.tickets.create({
      data: {
         eventID,
         userID,
         seatID,
         bookedDate,
        }
    });

    return response.status(200).json({
      status: true,
      message: `Tickets has been created`,
      data: newData,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

/** create a function to READ events */
const readTickets = async (request: Request, response: Response) => {
  try {
    const dataSeats = await prisma.tickets.findMany()
    return response .status(200).json({
        status: true,
        message: `Tickets has been loaded`,
        data: dataSeats
    })
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};


export {createTickets, readTickets}