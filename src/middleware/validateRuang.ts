import { NextFunction, Request, Response } from "express"
import Joi from "joi"

let schemaTabung = Joi.object({
    r : Joi.number().required().min(1),
    t : Joi.number().required().min(1)
})

let schemaBola = Joi.object({
    r : Joi.number().required().min(1)
})

let schemaKubus = Joi.object({
    s : Joi.number().required().min(1)
})

let schemaBalok = Joi.object({
    p : Joi.number().required().min(1),
    l : Joi.number().required().min(1),
    t : Joi.number().required().min(1)
})

/** create validation function */
export let validateTabung = (request: Request, response: Response, next: NextFunction) => {
    let { error } = schemaTabung.validate(request.body)
    if(error) {
        /** status 400 = BAD REQUEST */
        return response.status(400).json({
            message: error.details
        })
    }
    next()
}

/** create validation function */
export let validateBalok = (request: Request, response: Response, next: NextFunction) => {
    let { error } = schemaBalok.validate(request.body)
    if(error) {
        /** status 400 = BAD REQUEST */
        return response.status(400).json({
            message: error.details
        })
    }
    next()
}

/** create validation function */
export let validateKubus = (request: Request, response: Response, next: NextFunction) => {
    let { error } = schemaKubus.validate(request.body)
    if(error) {
        /** status 400 = BAD REQUEST */
        return response.status(400).json({
            message: error.details
        })
    }
    next()
}

/** create validation function */
export let validateBola = (request: Request, response: Response, next: NextFunction) => {
    let { error } = schemaBola.validate(request.body)
    if(error) {
        /** status 400 = BAD REQUEST */
        return response.status(400).json({
            message: error.details
        })
    }
    next()
}
