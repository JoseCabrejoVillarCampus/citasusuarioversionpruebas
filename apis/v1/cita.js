import express from "express";
import { coneccion } from "../../db/atlas.js";

let db = await coneccion();
let cita = db.collection("cita");

export const getCitaById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id); 

        let result = await cita.aggregate([
            {
                $match: { "cit_codigo": id } 
            },
            {
                $project: {
                    "_id":0,
                    "codigoCita": "$cit_codigo",
                    "codigoFecha": "$cit_fecha",
                    "codigoEstado": "$cit_estado",
                    "codigoMedico": "$cit_medico",
                    "codigoUsusario": "$cit_datosUsuarios"
                }
            }
        ]).toArray();

        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getCitaAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await cita.aggregate([
            {
                $project: {
                    "_id":0,
                    "codigoCita": "$cit_codigo",
                    "codigoFecha": "$cit_fecha",
                    "codigoEstado": "$cit_estado",
                    "codigoMedico": "$cit_medico",
                    "codigoUsusario": "$cit_datosUsuarios"
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};
export const postCita = async(req, res)=>{
    try{
        console.log(req.body);
        let result = await cita.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        console.log(error);
        }
};
export const putCita = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await cita.updateOne(
            { "cit_codigo": id},
            { $set: req.body }
        );
        res.send(result)
    } catch (error){
        res.status(422).send(error)
    }
};
export const delCita = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await cita.deleteOne(
            { "cit_codigo": id }
        );
        res.status(200).send(result)
    } catch (error){
        res.status(422).send(error)
    }
}

