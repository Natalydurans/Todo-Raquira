import { Request, Response } from "express"
import { Sesiones } from "../entity/sesiones.entity";
const jwt = require('jsonwebtoken');

export const GetSessiones = async (req: Request, res: Response) => {
    const token = req.query.jwt;
    if(!token || token==='null') return res.send({message: 'Token invalido'});
    const verify= jwt.verify(token, process.env.SECRET_KEY);
    if(!verify) return res.status(400).send({message: 'Token invalido'});
    res.send( await Sesiones.find());
}