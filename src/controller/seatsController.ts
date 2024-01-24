import { PrismaClient } from "@prisma/client";
import { Request, Response, response } from "express";

/** create an object of Prisma */
const prisma = new PrismaClient();

/** create a function to "create" new event */
/** asynchronous = fungsi yg berjalan secara paralel */
const createSeats = async (request: Request, response: Response) => {
  try {
    /** read a request from body */
    const eventID = request.body.eventID;
    const rowNum = request.body.rowNum;
    const seatNum =  request.body.seatNum;
    const status = request.body.status;

    /** insert to events table using prisma */
    const newData = await prisma.seats.create({
      data: {
         eventID,
         rowNum,
         seatNum,
         status
        }
    });

    return response.status(200).json({
      status: true,
      message: `Seats has been created`,
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
const readSeats = async (request: Request, response: Response) => {
  try {
    const dataSeats = await prisma.seats.findMany()
    return response .status(200).json({
        status: true,
        message: `Seats has been loaded`,
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
const updateSeats = async (request: Request, response: Response) => {
  try {
    /** read seatID yg that sent from URL */
    const seatID = request.params.seatID;
    /** read data perubahan */
    const eventID = request.body.eventID
    const rowNum = request.body.rowNum
    const seatNum = request.body.seatNum
    const status = request.body.status

    /** make sure that data has exists */
    const findSeats = await prisma.seats.findFirst({
      where: { seatID: Number(seatID) },
    });

    if (!findSeats) {
      /** give a respon when seats not found */
      return response.status(400).json({
        status: false,
        message: `Data event not found...`,
      });
    }

    const dataSeats = await prisma.seats.update({
      where: { seatID: Number(seatID) },
      data: {
        eventID: eventID || findSeats.eventID,
        rowNum: rowNum || findSeats.rowNum,
        seatNum: seatNum || findSeats.seatNum,
        status: status || findSeats.status
      },
    });

    return response.status(200).json({
      status: true,
      message: `Event has been updated`,
      data: dataSeats,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

/**create a function to delete event */
const deleteSeats = async (request: Request, response: Response) => {
  try {
    /**get event ID from URL */
    const seatID = request.params.seatID

    /**make sure that event is exist */
    const findSeats = await prisma.seats.findFirst({
      where: { seatID: Number(seatID)}
    })
    if (!findSeats) {
      /** give a respon when event not found */
      return response.status(400).json({
        status: false,
        message: `Data event not found...`,
      });
    }

    /**execute for delete event */
    const dataSeats = await prisma.seats.delete({
      where : {seatID: Number(seatID)}
    })
    return response.status(200)
    .json({
      status: true,
      message: `Data events has been deleted`
    })

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};


export {createSeats, readSeats, updateSeats, deleteSeats}