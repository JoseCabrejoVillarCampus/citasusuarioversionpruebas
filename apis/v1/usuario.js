import express from "express";
import { coneccion } from "../../db/atlas.js";

let db = await coneccion();
let usuario = db.collection("usuario");

export const getUsuarioById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id); 

        let result = await usuario.aggregate([
            {
                $match: { "usu_id": id }
            },
            {
                $project: {
                    "_id":0,
                    "codigoUsuario": "$usu_id",
                    "nombre": "$usu_nombre",
                    "segundoNombre": "$usu_segdo_nombre",
                    "apellido": "$usu_primer_apellido_usur",
                    "segundoApellido": "$usu_segdo_apellido_usur",
                    "telefono": "$usu_telefono",
                    "direccion": "$usu_direccion",
                    "email": "$usu_email",
                    "documento": "$usu_tipodoc",
                    "genero": "$usu_genero",
                    "acudiente": "$usu_acudiente"
                }
            }
        ]).toArray();

        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getUsuarioAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await usuario.aggregate([
            {
                $project: {
                    "_id":0,
                    "codigoUsuario": "$usu_id",
                    "nombre": "$usu_nombre",
                    "segundoNombre": "$usu_segdo_nombre",
                    "apellido": "$usu_primer_apellido_usur",
                    "segundoApellido": "$usu_segdo_apellido_usur",
                    "telefono": "$usu_telefono",
                    "direccion": "$usu_direccion",
                    "email": "$usu_email",
                    "documento": "$usu_tipodoc",
                    "genero": "$usu_genero",
                    "acudiente": "$usu_acudiente"
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};
export const postUsuario = async(req, res)=>{
    try{
        console.log(req.body);
        let result = await usuario.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        console.log(error);
        }
};
export const putUsuario = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await usuario.updateOne(
            { "usu_id": id},
            { $set: req.body }
        );
        res.send(result)
    } catch (error){
        res.status(422).send(error)
    }
};
export const delUsuario = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await usuario.deleteOne(
            { "usu_id": id }
        );
        res.status(200).send(result)
    } catch (error){
        res.status(422).send(error)
    }
}

