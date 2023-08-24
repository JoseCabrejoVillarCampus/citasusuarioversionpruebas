import { SignJWT, jwtVerify } from "jose"
import {coneccion} from "../db/atlas.js";
import { ObjectId } from "mongodb";
import dotenv from 'dotenv';
dotenv.config("../");

const conexionDB = await coneccion();
const crearToken = async (req, res, next) => {
    console.log(req.body);
    if (Object.keys(req.body).length === 0) return res.status(400).send({mesaage: "Datos no enviados"});
    const result = await conexionDB.collection('cliente').findOne(req.body);
    console.log(result);
    if (!result) return res.status(401).send({mesaage: "Cliente no encontrado"});
    const encoder = new TextEncoder();
    const id = result._id.toString();
    const jwtConstructor = await new SignJWT({ id: id})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('3h')
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    req.data = {status: 200, message: jwtConstructor};
    next(); 
}
const validarToken = async (req, token) => {
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        let res = await conexionDB.collection('cliente').findOne(
            {
                _id:new ObjectId(jwtData.payload.id),
                [`permisos.${req.baseUrl}`]: `${req.headers["accept-version"]}`
            }
        );
        let {_id, permisos, ...cliente} = res;
        return cliente;
    } catch (error) {
        return false;
    }
}
export {
    crearToken,
    validarToken
}