import { Router } from "express";
import { DeleteProduct, GetProductos, Product } from "./controller/producto.controller";
import { GetSessiones } from "./controller/sesiones.controller";


import { CreateUsuario, Delete, GetUsuario, Login, Logout, Register, User } from "./controller/usuario.controller";

export const routes = (router: Router) => {
    router.post('/api/v1/createUsuario', CreateUsuario);
    router.get('/api/v1/getUsuarios', GetUsuario);
    router.get('/api/v1/getSessiones', GetSessiones);
    router.get('/api/v1/productos', GetProductos);
    router.post('/api/v1/Register', Register);
    router.post('/api/v1/Login', Login);
    router.post('/api/v1/Logout', Logout);
    router.post('/api/v1/product', Product);
    router.post('/api/v1/updateUser', User);
    router.delete('/api/v1/deletePersona/:id', Delete);
    router.delete('/api/v1/deleteProducto/:id', DeleteProduct);

}