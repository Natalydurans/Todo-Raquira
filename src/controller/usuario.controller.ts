import { Request, Response } from "express"
import { Usuario } from "../entity/usuario.entity";
import bcryptjs from "bcryptjs"
import { sign } from "jsonwebtoken";
import { Sesiones } from "../entity/sesiones.entity";
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: 'prueba.uptcdis@gmail.com',
      pass: 'qqemjqbrvxnufhun'
    }
  });

export const CreateUsuario = async (req: Request, res: Response) => {
    const token = req.query.jwt;
    if(!token) return res.send({message: 'Token invalido'});
    const verify= jwt.verify(token, process.env.SECRET_KEY);
    if(!verify) return res.status(400).send({message: 'Token invalido'});    bcrypt.genSalt(10, function (err, Salt) {
        bcrypt.hash(req.body.password, Salt, function (err, hash) {
          const usuarioToSave = Usuario.save({
              user_type: req.body.rol, email: req.body.email, password: hash, 
          })
          res.send(usuarioToSave);
        })
    })
}


export const Register = async (req: Request, res: Response) => {
    var randomstring = Math.random().toString(36).slice(-8);
bcrypt.genSalt(10, function (err, Salt) {
  bcrypt.hash(randomstring, Salt, function (err, hash) {
    const usuarioToSave = Usuario.save({
        user_type: req.body.rol, email: req.body.email, password: hash, user_name: req.body.name, state: 'inactivo'
    })
  })
})
var mailOptions ={
  from: 'prueba.uptcdis@gmail.com',
  to: req.body.email,
  subject: 'Creacion de cuenta',
  text: 'Estimado ' + req.body.name + ' Su cuenta de usuario de Todo Raquira fue creada con exito, su contraseña es: ' + randomstring 
  + '' 
};
transporter.sendMail(mailOptions, function(error, info){
if (error) {
  res.send({message: 'Hay un error en el envio de correo' })
  console.log(error);
} else {
  res.send({message: 'Correo enviado exitosamente' });
  console.log('Email sent: ' + info.response);
}
});
}

export const Login = async (req: Request, res: Response) => {
    console.log(req.body)
    const {email, password:pass } = req.body
    const usuario = await Usuario.findOneBy ( { email })
    console.log(usuario)
    if (!usuario || !await bcryptjs.compare(pass, usuario.password)) {
        return res.status(400).send(
            {message: 'credenciales no válidas'}
        )
    }

    const token = sign({
        id_usuario: usuario.id_usuario
    }, process.env.SECRET_KEY, {expiresIn: '1d'})
    
    const today = new Date()
    let tomorrow =  new Date()
    tomorrow.setDate(today.getDate() + 1)

    Sesiones.save({
        email: email,
        fecha_hora: today,
        ip: req.connection.remoteAddress,
        fecha_fin: tomorrow,
        estado: 'activo'
    })
    
    res.send({
        rol: usuario.user_type,
        id: usuario.id_usuario,
        token: token,
        email: usuario.email,
    });
}


//Obtener un administrador
export const AuthenticatedUser =  async (req: Request, res: Response) => {
    const {password, ...usuario} = req['usuario'];
    res.send(usuario)
}

//Obtener todos los usuarios
export const GetUsuario = async (req: Request, res: Response) => {
    const token = req.query.jwt;
    if(!token || token==='null') return res.send({message: 'Token invalido'});
    const verify= jwt.verify(token, process.env.SECRET_KEY);
    if(!verify) return res.status(400).send({message: 'Token invalido'});
    res.send( await Usuario.find());
}

export const Logout = async (req: Request, res: Response) => {
    console.log(req.body)
  // Sesiones.query(`UPDATE sesiones SET estado = 'inactivo' WHERE email = '${req.body.email}'`)
res.send({message: 'Sesion cerrada'})
}

export const UpdateInfo = async (req: Request, res: Response) => {
    const usuario = req['usuario'];
    await Usuario.update(usuario.id_usuario, req.body);
    const { password, ...userRead } = await Usuario.findOneBy({id_usuario: usuario.id_usuario});
    res.send(userRead);
}

export const UpdatePassword =  async (req: Request, res: Response) =>  {
    const usuario = req['usuario'];
    const { password, password_confirm } = req.body;
    if ( password != password_confirm ) {
        return res.status(400).send(
            {message: 'las contraseñas no coinciden'}
        )
    }
    await Usuario.update(usuario.id_usuario, { password: await bcryptjs.hash(password, 10)});
    const { password:pass, ...userRead} = usuario;
    res.send(userRead);
}


export const User = async (req: Request, res: Response) => {
    const token = req.query.jwt;
    if(!token || token==='null') return res.send({message: 'Token invalido'});
    const verify= jwt.verify(token, process.env.SECRET_KEY);
    if(!verify) return res.status(400).send({message: 'Token invalido'});
    await Usuario.update(req.body.id_usuario, req.body);
    res.send({message: 'Producto creado exitosamente'})
}

export const Delete = async (req: Request, res: Response) => {
    try {
      await Usuario.delete(req.params.id);
      res.status(204).send(null);
    } catch (error) {
      throw error.message;
    }
  };