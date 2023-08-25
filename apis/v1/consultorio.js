import express from "express";
import { coneccion } from "../../db/atlas.js";

let db = await coneccion();
let consultorio = db.collection("consultorio");
export const getConsultorioById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id); // Convertir a número entero

        let result = await consultorio.aggregate([
            {
                $match: { "cons_codigo": parseInt(id) }
            },
            {
                $project: {
                    "_id":0,
                    "codigoConsultorio": "$cons_codigo",
                    "consultorio": "$cons_nombre"
                }
            }
        ]).toArray();

        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getConsultorioAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await consultorio.aggregate([
            {
                $project: {
                    "_id":0,
                    "codigoConsultorio": "$cons_codigo",
                    "consultorio": "$cons_nombre"
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};
export const postConsultorio = async(req, res)=>{
    try{
        console.log(req.body);
        let result = await consultorio.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        console.log(error);
        }
};
export const putConsultorio = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await consultorio.updateOne(
            { "cons_codigo": id},
            { $set: req.body }
        );
        res.send(result)
    } catch (error){
        res.status(422).send(error)
    }
};
export const delConsultorio = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await consultorio.deleteOne(
            { "cons_codigo": id }
        );
        res.status(200).send(result)
    } catch (error){
        res.status(422).send(error)
    }
}

