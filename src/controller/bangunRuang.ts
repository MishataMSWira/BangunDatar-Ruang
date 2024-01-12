import { Request, Response } from "express";

const volumeTabung = (request: Request, response: Response) => {
    try {
        const phi = Math.PI
        const r: number = Number(request.body.r)
        const t: number = Number(request.body.t)
        const volume = phi * (r*2) * t
        return response.status(200).json({
            status: true,
            r,
            t,
            volume
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const luaspermukaanTabung = (request: Request, response: Response) => {
    try {
        const phi = Math.PI
        const r: number = Number(request.body.r)
        const t: number = Number(request.body.t)
        const luaspermukaan = 2 * phi * r * (r+t)
        return response.status(200).json({
            status: true,
            r,
            t,
            luaspermukaan
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const volumeKubus = (request: Request, response: Response) => {
    try {
        const s: number = Number(request.body.s)
        const volume = s * 3
        return response.status(200).json({
            status: true,
            s,
            volume
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const luaspermukaanKubus = (request: Request, response: Response) => {
    try {
        const s: number = Number(request.body.s)
        const luaspermukaan = 6 * (s*2)
        return response.status(200).json({
            status: true,
            s,
            luaspermukaan
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const volumeBalok = (request: Request, response: Response) => {
    try {
        const p: number = Number(request.body.p)
        const l: number = Number(request.body.l)
        const t: number = Number(request.body.t)
        const volume = p * l * t
        return response.status(200).json({
            status: true,
            p,
            l,
            t,
            volume
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const luaspermukaanBalok = (request: Request, response: Response) => {
    try {
        const p: number = Number(request.body.p)
        const l: number = Number(request.body.l)
        const t: number = Number(request.body.t)
        const luaspermukaan = 2 * (p*l + p*t + l*t)
        return response.status(200).json({
            status: true,
            p,
            l,
            t,
            luaspermukaan
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const volumeBola = (request: Request, response: Response) => {
    try {
        const phi = Math.PI
        const r: number = Number(request.body.r)
        const volume = (4/3) * phi * (r*3)
        return response.status(200).json({
            status: true,
            r,
            volume
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const luaspermukaanBola = (request: Request, response: Response) => {
    try {
        const phi = Math.PI
        const r: number = Number(request.body.r)
        const luaspermukaan = 4 * phi * (r*2)
        return response.status(200).json({
            status: true,
            r,
            luaspermukaan
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

export {volumeTabung, luaspermukaanTabung, volumeKubus, luaspermukaanKubus, volumeBalok, luaspermukaanBalok, volumeBola, luaspermukaanBola}