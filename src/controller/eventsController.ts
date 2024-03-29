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
    const page = Number(request.query.page) || 1;
    const qty = Number(request.query.qty) || 10;
    const keyword = request.query.keyword?.toString() || "";
    const dataEvent = await prisma.events.findMany({
      take: qty, // mendefinisikan jml data yg diambil
      skip: (page -1) * qty,
      where: {
        OR: [
          {eventName: {contains: keyword}},
          {venue: {contains: keyword}},
        ]
      },
      orderBy: {eventName: "asc"}
    });
    return response.status(200).json({
      status: true,
      message: `Events has been loaded`,
      data: dataEvent,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

/** function for update event */
const updateEvent = async (request: Request, response: Response) => {
  try {
    /** read eventID yg that sent from URL */
    const eventID = request.params.eventID;
    /** read data perubahan */
    const eventName = request.body.eventName;
    const price = Number(request.body.price);
    const venue = request.body.venue;
    const eventDate = new Date(request.body.eventDate).toISOString();

    /** make sure that data has exists */
    const findEvent = await prisma.events.findFirst({
      where: { eventID: Number(eventID) },
    });

    if (!findEvent) {
      /** give a respon when event not found */
      return response.status(400).json({
        status: false,
        message: `Data event not found...`,
      });
    }

    const dataEvent = await prisma.events.update({
      where: { eventID: Number(eventID) },
      data: {
        eventName: eventName || findEvent.eventName,
        eventDate: eventDate || findEvent.eventDate,
        price: price || findEvent.price,
        venue: venue || findEvent.venue,
      },
    });

    return response.status(200).json({
      status: true,
      message: `Event has been updated`,
      data: dataEvent,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

/**create a function to delete event */
const deleteEvents = async (request: Request, response: Response) => {
  try {
    /**get event ID from URL */
    const eventID = request.params.eventID

    /**make sure that event is exist */
    const findEvent = await prisma.events.findFirst({
      where: { eventID: Number(eventID)}
    })
    if (!findEvent) {
      /** give a respon when event not found */
      return response.status(400).json({
        status: false,
        message: `Data event not found...`,
      });
    }

    /**execute for delete event */
    const dataEvent = await prisma.events.delete({
      where : {eventID: Number(eventID)}
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

export { createEvent, readEvents, updateEvent, deleteEvents };
