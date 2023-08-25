import express from "express";
import { coneccion } from "../../db/atlas.js";

let db = await coneccion();
let tipo_documento = db.collection("tipo_documento");

export const getDocumentoById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id); 

        let result = await tipo_documento.aggregate([
            {
                $match: {
                    "tipdoc_id": id
                }
            },
            {
                $project: {
                    "_id":0,
                    "codigoDocumento":"$tipdoc_id",
                    "tipoDocumento":"$tipdoc_nombre", 
                    "abreviatura":"$tipdoc_abreviatura"
                }
            }
        ]).toArray();

        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getDocumentoAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await tipo_documento.aggregate([
            {
                $project: {
                    "_id":0,
                    "codigoDocumento":"$tipdoc_id",
                    "tipoDocumento":"$tipdoc_nombre", 
                    "abreviatura":"$tipdoc_abreviatura"
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};
export const postDocumento = async(req, res)=>{
    try{
        console.log(req.body);
        let result = await tipo_documento.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        console.log(error);
        }
};
export const putDocumento = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await cita.updateOne(
            { "tipdoc_id": id},
            { $set: req.body }
        );
        res.send(result)
    } catch (error){
        res.status(422).send(error)
    }
};
export const delDocumento = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await tipo_documento.deleteOne(
            { "tipdoc_id": id }
        );
        res.status(200).send(result)
    } catch (error){
        res.status(422).send(error)
    }
}

