import { PrismaClient } from "@prisma/client";
import { Request, Response, response } from "express";

/** create an object of Prisma */
const prisma = new PrismaClient();

/** create a function to "create" new event */
/** asynchronous = fungsi yg berjalan secara paralel */
const createEvent = async (request: Request, response: Response) => {
  try {
    /** read a request from body */
    const eventName = request.body.eventName;
    const eventDate = new Date(request.body.eventDate).toISOString();
    const venue = request.body.venue;
    const price = Number(request.body.price);

    /** insert to events table using prisma */
    const newData = await prisma.events.create({
      data: {
        eventName: eventName,
        eventDate: eventDate,
        venue: venue,
        price: price,
      },
    });

    return response.status(200).json({
      status: true,
      message: `Events has been created`,
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
const readEvents = async (request: Request, response: Response) => {
  try {
    const dataEvent = await prisma.events.findMany()
    return response .status(200).json({
        status: true,
        message: `Events has been loaded`,
        data: dataEvent
    })
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};


export {createEvent, readEvents}