import { Productos } from "../entity/productos";
import { Request, Response } from "express"
const jwt = require('jsonwebtoken');

export const GetProductos = async(req: Request, res: Response) => {
    const token = req.query.jwt;
    if(!token || token==='null') return res.send({message: 'Token invalido'});
    const verify= jwt.verify(token, process.env.SECRET_KEY);
    if(!verify) return res.status(400).send({message: 'Token invalido'});
    res.send( await Productos.find());
}

export const Product = async (req: Request, res: Response) => {
    const token = req.query.jwt;
    if(!token || token==='null') return res.send({message: 'Token invalido'});
    const verify= jwt.verify(token, process.env.SECRET_KEY);
    if(!verify) return res.status(400).send({message: 'Token invalido'});
    Productos.save({...req.body})
    res.send({message: 'Producto creado exitosamente'})
}

export const DeleteProduct = async (req: Request, res: Response) => {
    try {
      await Productos.delete(req.params.id);
      res.status(204).send(null);
    } catch (error) {
      throw error.message;
    }
}

export const UpdateProduct = async (req: Request, res: Response) => {
  console.log(req.body)
  await Productos.update(req.body.id_producto, req.body);
  const {...userRead } = await Productos.findOneBy({id_producto: req.body.id_producto});
  res.send(userRead);
}