import express from "express";
import { coneccion } from "../../db/atlas.js";

let db = await coneccion();
let genero = db.collection("genero");

export const getGeneroById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id); 

        let result = await genero.aggregate([
            {
                $match: { "gen_id": id }
            },
            {
                $project: {
                    "_id":0,
                    "codigoGenero": "$gen_id",
                    "genero": "$gen_nombre",
                    "abrebiatura": "$gen_abreiatura"
                }
            }
        ]).toArray();

        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getGeneroAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await genero.aggregate([
            {
                $project: {
                    "_id":0,
                    "codigoGenero": "$gen_id",
                    "genero": "$gen_nombre",
                    "abrebiatura": "$gen_abreiatura"
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};
export const postGenero = async(req, res)=>{
    try{
        console.log(req.body);
        let result = await genero.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        console.log(error);
        }
};
export const putGenero = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await genero.updateOne(
            { "gen_id": id},
            { $set: req.body }
        );
        res.send(result)
    } catch (error){
        res.status(422).send(error)
    }
};
export const delGenero = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await genero.deleteOne(
            { "gen_id": id }
        );
        res.status(200).send(result)
    } catch (error){
        res.status(422).send(error)
    }
}

