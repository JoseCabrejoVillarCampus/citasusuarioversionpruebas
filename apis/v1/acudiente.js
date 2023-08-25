import express from "express";
import { coneccion } from "../../db/atlas.js";

let db = await coneccion();
let acudiente = db.collection("acudiente");
export const getAcudienteById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id); // Convertir a número entero

        let result = await acudiente.aggregate([
            {
                $match: { "acu_codigo": id } // Usar la variable 'id'
            },
            {
                $project: {
                    "_id":0,
                    "codigoAcudiente": "$acu_codigo",
                    "nombreAcudiente": "$acu_nombreCompleto",
                    "telefono": "$acu_telefono",
                    "direccion": "$acu_direccion"
                }
            }
        ]).toArray();

        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getAcudienteAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await acudiente.aggregate([
            {
                $project: {
                    "_id":0,
                    "codigoAcudiente": "$acu_codigo",
                    "nombreAcudiente": "$acu_nombreCompleto",
                    "telefono": "$acu_telefono",
                    "direccion": "$acu_direccion"
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};
export const postAcudiente = async(req, res)=>{
    try{
        console.log(req.body);
        let result = await acudiente.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        console.log(error);
        }
};
export const putAcudiente = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await acudiente.updateOne(
            { "acu_codigo": id},
            { $set: req.body }
        );
        res.send(result)
    } catch (error){
        res.status(422).send(error)
    }
};
export const delAcudiente = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await acudiente.deleteOne(
            { "acu_codigo": id }
        );
        res.status(200).send(result)
    } catch (error){
        res.status(422).send(error)
    }
}

