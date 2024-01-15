import { NextFunction, Request, Response } from "express"
import Joi from "joi"

let schemaLingkaran = Joi.object({
    r : Joi.number().required().min(1)
})

let schemaPersegi = Joi.object({
    s : Joi.number().required().min(1)
})

let schemaPersegiPanjang = Joi.object({
    l : Joi.number().required().min(1),
    p : Joi.number().required().min(1)
})

let schemaSegitiga = Joi.object({
    a : Joi.number().required().min(1),
    t : Joi.number().required().min(1)
})

/** create validation function */
export let validateLingkaran = (request: Request, response: Response, next: NextFunction) => {
    let { error } = schemaLingkaran.validate(request.body)
    if(error) {
        /** status 400 = BAD REQUEST */
        return response.status(400).json({
            message: error.details
        })
    }
    next()
}

/** create validation function */
export let validatePersegi = (request: Request, response: Response, next: NextFunction) => {
    let { error } = schemaPersegi.validate(request.body)
    if(error) {
        /** status 400 = BAD REQUEST */
        return response.status(400).json({
            message: error.details
        })
    }
    next()
}

/** create validation function */
export let validatePersegiPanjang = (request: Request, response: Response, next: NextFunction) => {
    let { error } = schemaPersegiPanjang.validate(request.body)
    if(error) {
        /** status 400 = BAD REQUEST */
        return response.status(400).json({
            message: error.details
        })
    }
    next()
}

/** create validation function */
export let validateSegitiga = (request: Request, response: Response, next: NextFunction) => {
    let { error } = schemaSegitiga.validate(request.body)
    if(error) {
        /** status 400 = BAD REQUEST */
        return response.status(400).json({
            message: error.details
        })
    }
    next()
}
