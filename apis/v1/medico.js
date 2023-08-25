import express from "express";
import { coneccion } from "../../db/atlas.js";

let db = await coneccion();
let medico = db.collection("medico");

export const getMedicoById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id); 

        let result = await medico.aggregate([
            {
                $match: { "med_nroMatriculaProsional": id }
            },
            {
                $project: {
                    "_id":0,
                    "matriculaMedica": "$med_nroMatriculaProsional",
                    "nombreMedico": "$med_nombreCompleto",
                    "consultorio": "$med_consultorio",
                    "especialidad": "$med_especialidad"
                }
            }
        ]).toArray();

        res.send(result); 

    } catch (error) {
        next(error);
    }
};
export const getMedicoAll = (req, res, next)=>{
    return new Promise(async(resolve)=>{
        let result = await medico.aggregate([
            {
                $project: {
                    "_id":0,
                    "matriculaMedica": "$med_nroMatriculaProsional",
                    "nombreMedico": "$med_nombreCompleto",
                    "consultorio": "$med_consultorio",
                    "especialidad": "$med_especialidad"
                }
            }
        ]).toArray();
        res.send(result);
    }) 
};
export const postMedico = async(req, res)=>{
    try{
        console.log(req.body);
        let result = await medico.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        console.log(error);
        }
};
export const putMedico = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await medico.updateOne(
            { "med_nroMatriculaProsional": id},
            { $set: req.body }
        );
        res.send(result)
    } catch (error){
        res.status(422).send(error)
    }
};
export const delMedico = async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        let result = await medico.deleteOne(
            { "med_nroMatriculaProsional": id }
        );
        res.status(200).send(result)
    } catch (error){
        res.status(422).send(error)
    }
}

