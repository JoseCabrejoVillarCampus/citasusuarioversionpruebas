import express from "express";
import { coneccion } from "../../db/atlas.js";

let db = await coneccion();
let especialidad = db.collection("especialidad");
export const getEspecialidadById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id); // Convertir a número entero

        let result = await especialidad.aggregate([
            {
                $match: { "esp_id": id }
            },
            {
                $project: {
                    "_id":0,
                    "codigoEspecialidad": "$esp_id",
                    "nombreEspecialidad": "$esp_nombre"
                }
            }
        ]).toArray();

        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getEspecialidadAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await especialidad.aggregate([
            {
                $project: {
                    "_id":0,
                    "codigoEspecialidad": "$esp_id",
                    "nombreEspecialidad": "$esp_nombre"
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};
export const postEspecialidad = async(req, res)=>{
    try{
        console.log(req.body);
        let result = await especialidad.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        console.log(error);
        }
};
export const putEspecialidad = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await especialidad.updateOne(
            { "esp_id": id},
            { $set: req.body }
        );
        res.send(result)
    } catch (error){
        res.status(422).send(error)
    }
};
export const delEspecialidad = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await especialidad.deleteOne(
            { "esp_id": id }
        );
        res.status(200).send(result)
    } catch (error){
        res.status(422).send(error)
    }
}

