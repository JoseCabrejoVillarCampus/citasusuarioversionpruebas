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
                    "codigoAcudiente": "$acu_codigo",
                    "nombreAcudiente": "$acu_nombreCompleto",
                    "telefono": "$acu_telefono",
                    "direccion": "$acu_direccion"
                }
            }
        ]).toArray();
        resolve(result);
        const data = await getAcudienteAll();
        res.send(data);
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


export const userV1 = (req, res, next) => {
    if(!req.rateLimit) return;
    console.log(req.user);
    res.status(200).send('ok 1.0.0');
}
export const userV11 = (req, res, next) => {
    if(!req.rateLimit) return; 
    console.log(req.user);
    res.status(200).send('ok 1.1.1');
}
