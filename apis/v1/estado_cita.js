import express from "express";
import { coneccion } from "../../db/atlas.js";

let db = await coneccion();
let estado_cita = db.collection("estado_cita");

export const getEstadoById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id); 

        let result = await estado_cita.aggregate([
            {
                $match: { "estcita_id": id }
            },
            {
                $project: {
                    "_id":0,
                    "codigoCitaEstado": "$estcita_id",
                    "Estado": "$estcita_nombre",
                }
            }
        ]).toArray();

        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getEstadoAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await estado_cita.aggregate([
            {
                $project: {
                    "_id":0,
                    "codigoCitaEstado": "$estcita_id",
                    "Estado": "$estcita_nombre",
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};
export const postEstado = async(req, res)=>{
    try{
        console.log(req.body);
        let result = await estado_cita.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        console.log(error);
        }
};
export const putEstado = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await estado_cita.updateOne(
            { "estcita_id": id},
            { $set: req.body }
        );
        res.send(result)
    } catch (error){
        res.status(422).send(error)
    }
};
export const delEstado = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await estado_cita.deleteOne(
            { "estcita_id": id }
        );
        res.status(200).send(result)
    } catch (error){
        res.status(422).send(error)
    }
}

