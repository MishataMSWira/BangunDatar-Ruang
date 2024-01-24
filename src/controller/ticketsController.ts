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

/** function for update seats */
const updateTickets = async (request: Request, response: Response) => {
  try {
    /** read seatID yg that sent from URL */
    const ticketID = request.params.ticketID;
    /** read data perubahan */
    const eventID = request.body.eventID
    const userID = request.body.userID
    const seatID = request.body.seatID
    const bookedDate = request.body.bookedDate

    /** make sure that data has exists */
    const findTickets = await prisma.tickets.findFirst({
      where: { ticketID: Number(ticketID) },
    });

    if (!findTickets) {
      /** give a respon when seats not found */
      return response.status(400).json({
        status: false,
        message: `Data tickets not found...`,
      });
    }

    const dataTickets = await prisma.tickets.update({
      where: { ticketID: Number(ticketID) },
      data: {
        eventID: eventID || findTickets.eventID,
        userID: userID || findTickets.userID,
        seatID: seatID || findTickets.seatID,
        bookedDate: bookedDate || findTickets.bookedDate
      },
    });

    return response.status(200).json({
      status: true,
      message: `Tickets has been updated`,
      data: dataTickets,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

/**create a function to delete tickets */
const deleteTickets = async (request: Request, response: Response) => {
  try {
    /**get event ID from URL */
    const ticketID = request.params.ticketID

    /**make sure that event is exist */
    const findTickets = await prisma.tickets.findFirst({
      where: { ticketID: Number(ticketID)}
    })
    if (!findTickets) {
      /** give a respon when event not found */
      return response.status(400).json({
        status: false,
        message: `Data tickets not found...`,
      });
    }

    /**execute for delete tickets */
    const dataTickets = await prisma.tickets.delete({
      where : {ticketID: Number(ticketID)}
    })
    return response.status(200)
    .json({
      status: true,
      message: `Data tickets has been deleted`
    })

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};



export {createTickets, readTickets, updateTickets, deleteTickets}