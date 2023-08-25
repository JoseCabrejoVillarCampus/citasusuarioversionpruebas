import express from "express";
import { coneccion } from "../../db/atlas.js";

let db = await coneccion();
let cita = db.collection("cita");
let acudiente = db.collection("acudiente");
let consultorio = db.collection("consultorio");
let especialidad = db.collection("especialidad");
let estado_cita = db.collection("estado_cita");
let genero = db.collection("genero");
let medico = db.collection("medico");
let tipo_documento = db.collection("tipo_documento");
let usuario = db.collection("usuario");

//? Obtener todas las citas numericamente

export const citaOrderNum= async (req, res, next)=>{
    try {
        let result = await cita.find().sort({
            cit_codigo:1
        }).toArray();
        res.send(result);
    } catch (error) {
        next(error);
    }
};

//? Obtener todos los pacientes alfabéticamente

export const patientOrderAlph= async (req, res, next)=>{
    try {
        let result = await usuario.find().sort({
            usu_nombre: 1
        }).toArray();
        res.send(result);
    } catch (error) {
        next(error);
    }
};

//? Obtener todos los médicos de una especialidad específica (por ejemplo, 'Cardiología')

export const medXespecialidad= async (req, res, next)=>{
    try {
        const especialidad = req.params.id;
        let result = await medico.aggregate([
            {
                $lookup: {
                    from: "especialidad",
                    localField: "med_especialidad",
                    foreignField: "esp_id",
                    as: "especialidad_FK"
                }
            },
            {
                $unwind: "$especialidad_FK"
            },
            {
                $match: {
                    "especialidad_FK.esp_nombre":especialidad
                }
            },
            {
                $project: {
                    "_id": 0,
                    "matriculaMedica": "$med_nroMatriculaProsional",
                    "nombreMedico": "$med_nombreCompleto",
                    "consultorio": "$med_consultorio",
                    "especialidad": "$especialidad_FK.esp_nombre" 
                }
            }
        ]).toArray();
        res.send(result);
    } catch (error) {
        next(error);
    }
};

// ? Encontrar la próxima cita para un paciente específico (por ejemplo, el paciente con usu_id 1)

export const proxCitUsu= async (req, res, next)=>{
    try {
        const id = parseInt(req.params.id)
        let result = await cita.aggregate([
            {
                $lookup: {
                    from: "usuario",
                    localField: "cit_datosUsuarios",
                    foreignField: "usu_id",
                    as: "usuario_FK"
                }
            },
            {
                $unwind: "$usuario_FK"
            },
            {
                $match: {
                    "usuario_FK.usu_id": id
                }
            },
            {
                $project: {
                    "_id": 0,
                    "fecha": {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$cit_fecha"
                        }
                    },
                    "usuario": "$usuario_FK.usu_id" 
                }
            }
        ]).toArray();
        res.send(result);
    } catch (error) {
        next(error);
    }
};

// ! Encontrar todos los pacientes que tienen citas con un médico específico (por ejemplo, el médico con med_nroMatriculaProsional 1)

export const citMedicoEspecific= async (req, res, next)=>{
    try {
        const id = parseInt(req.params.id)
        let result = await cita.aggregate([
            {
                $lookup: {
                    from: "medico",
                    localField: "med_nroMatriculaProsional",
                    foreignField: "cit_medico",
                    as: "medico_FK"
                }
            },
            {
                $unwind: "$medico_FK"
            },
            {
                $lookup: {
                    from: "usuario",
                    localField: "usu_id",
                    foreignField: "cit_datosUsuarios",
                    as: "usu_FK"
                }
            },
            {
                $unwind: "$usu_FK"
            },
            {
                $project: {
                    "_id": 0,
                    "medico": "$cit_medico",
                    "datosMedico": "$medico_FK.med_nombreCompleto",
                    "codUsu":"$usu_FK.usu_id",
                    "nombre":"$usu_FK.usu_nombre",
                    "segundoNombre":"$usu_FK.usu_segdo_nombre",
                    "apellido":"$usu_FK.usu_primer_apellido_usur",
                    "segundoApellido":"$usu_FK.usu_segdo_apellido_usur",
                    "telefono":"$usu_FK.usu_telefono",
                    "email":"$usu_FK.usu_email",
                }
            }
        ]).toArray();
        res.send(result);
    } catch (error) {
        next(error);
    }
};

//! Obtener las consultorías para un paciente específico (por ejemplo, paciente con usu_id 1)

export const patientConsult = async (req, res, next)=>{
    try {
        const id = parseInt(req.params.id)
        let result = await cita.aggregate([
            {
                $match: {
                    "cit_datosUsuarios": id
                }
            },
            {
                $lookup: {
                    from: "medico",
                    localField: "cit_medico",
                    foreignField: "med_nroMatriculaProsional",
                    as: "medico_FK"
                }
            },
            {
                $lookup: {
                    from: "consultorio",
                    localField: "medico_FK.med_consultorio",
                    foreignField: "cons_codigo",
                    as: "consultorio_info"
                }
            },
            {
                $unwind: "$medico_FK"
            },
            {
                $unwind: "$consultorio_info"
            },
            {
                $project: {
                    "_id": 0,
                    "codigoCita": "$cit_codigo",
                    "fechaCita": "$cit_fecha",
                    "estadoCita": "$cit_estado",
                    "nombreMedico": "$medico_FK.med_nombreCompleto",
                    "nombreConsultorio": "$consultorio_info.cons_nombre"
                }
            }
        ]).toArray();
        res.send(result);
    } catch (error) {
        next(error);
    }
};