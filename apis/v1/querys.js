import express from "express";
import {
    coneccion
} from "../../db/atlas.js";

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

export const citaOrderNum = async (req, res, next) => {
    try {
        let result = await cita.find().sort({
            cit_codigo: 1
        }).toArray();
        res.send(result);
    } catch (error) {
        next(error);
    }
};

//? Obtener todos los pacientes alfabéticamente

export const patientOrderAlph = async (req, res, next) => {
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

export const medXespecialidad = async (req, res, next) => {
    try {
        const especialidad = req.params.id;
        let result = await medico.aggregate([{
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
                    "especialidad_FK.esp_nombre": especialidad
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

export const proxCitUsu = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        let result = await cita.aggregate([{
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

// ? Encontrar todos los pacientes que tienen citas con un médico específico (por ejemplo, el médico con med_nroMatriculaProsional 1)

export const citMedicoEspecifico = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        let result = await cita.aggregate([{
                $match: {
                    "cit_medico": id
                }
            },
            {
                $lookup: {
                    from: "usuario",
                    localField: "cit_datosUsuarios",
                    foreignField: "usu_id",
                    as: "paciente"
                }
            },
            {
                $project: {
                    "_id": 0,
                    "medico": medicoNroMatriculaProfesional,
                    "paciente": {
                        "nombre": "$paciente.usu_nombre",
                        "segundoNombre": "$paciente.usu_segdo_nombre",
                        "apellido": "$paciente.usu_primer_apellido_usur",
                        "segundoApellido": "$paciente.usu_segdo_apellido_usur",
                        "telefono": "$paciente.usu_telefono",
                        "email": "$paciente.usu_email"
                    }
                }
            }
        ]).toArray();
        res.send(result);
    } catch (error) {
        next(error);
    }
};

//? Obtener las consultorías para un paciente específico (por ejemplo, paciente con usu_id 1)

export const patientConsult = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        let result = await cita.aggregate([{
                $match: {
                    "cit_datosUsuarios": id
                }
            },
            {
                $lookup: {
                    from: "medico",
                    localField: "cit_medico",
                    foreignField: "med_nroMatriculaProsional",
                    as: "medico"
                }
            },
            {
                $unwind: "$medico"
            },
            {
                $lookup: {
                    from: "consultorio",
                    localField: "medico.med_consultorio",
                    foreignField: "cons_codigo",
                    as: "consultorio"
                }
            },
            {
                $lookup: {
                    from: "usuario",
                    localField: "cit_datosUsuarios",
                    foreignField: "usu_id",
                    as: "usuario"
                }
            },
            {
                $project: {
                    "_id": 0,
                    "consultorio": "$consultorio.cons_nombre",
                    "medico": "$medico.med_nombreCompleto",
                    "Usuario": {
                        "Nombre": "$usuario.usu_nombre",
                        "Apellido": "$usuario.usu_primer_apellido_usur",
                        "Telefono": "$usuario.usu_telefono"
                    }
                }
            }
        ]).toArray();
        res.send(result);
    } catch (error) {
        next(error);
    }
};

// ? Encontrar todas las citas para un día específico (por ejemplo, '2023-02-02')
export const citDiaEspecifico = async (req, res, next) => {
    try {
        const fechaParametro = new Date(req.params.id);
        const fechaInicio = new Date(
            fechaParametro.getFullYear(),
            fechaParametro.getMonth(),
            fechaParametro.getDate()
        );
        const fechaFin = new Date(
            fechaParametro.getFullYear(),
            fechaParametro.getMonth(),
            fechaParametro.getDate() + 1
        );

        let result = await cita.aggregate([{
            $match: {
                "cit_fecha": {
                    $gte: fechaInicio,
                    $lt: fechaFin
                }
            },
        }]).toArray();

        res.send(result);
    } catch (error) {
        next(error);
    }
};

// ? Obtener los médicos y sus consultorios
export const medicoXConsultorio = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        let result = await db.medico.aggregate([{
                $match: {
                    "med_nroMatriculaProsional": id
                },
            },
            {
                $lookup: {
                    from: "consultorio",
                    localField: "med_consultorio",
                    foreignField: "cons_codigo",
                    as: "consultorio_FK"
                }
            },
            {
                $unwind: "$consultorio_FK"
            },
            {
                $project: {
                    "_id": 0,
                    "medico": "$med_nombreCompleto",
                    "consultorio": "$consultorio_FK.cons_nombre"
                }
            }
        ]).toArray();
        res.send(result);
    } catch (error) {
        next(error);
    }
};

// ? Contar el número de citas que un médico tiene en un día específico (por ejemplo, el médico con med_nroMatriculaProsional 1 en '2023-07-12')

export const contarCitasMedicoDia = async (req, res, next) => {
    try {
        const medicoNroMatriculaProfesional = req.params.medicoNroMatriculaProfesional;
        const fechaParametro = new Date(req.params.id);
        const fechaInicio = new Date(
            fechaParametro.getFullYear(),
            fechaParametro.getMonth(),
            fechaParametro.getDate()
        );
        const fechaFin = new Date(
            fechaParametro.getFullYear(),
            fechaParametro.getMonth(),
            fechaParametro.getDate() + 1
        );

        let result = await cita.aggregate([{
                $match: {
                    "cit_medico": medicoNroMatriculaProfesional,
                    "cit_fecha": {
                        $gte: fechaInicio,
                        $lt: fechaFin
                    }
                }
            },
            {
                $group: {
                    _id: "$cit_medico",
                    totalCitas: {
                        $sum: 1
                    }
                }
            }
        ]).toArray();

        res.send(result);
    } catch (error) {
        next(error);
    }
};

// ? Obtener los consultorio donde se aplicó las citas de un paciente

export const consultorioAplicadasCitasPacientes = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        let result = await cita.aggregate([{
                $match: {
                    cit_datosUsuarios: id
                }
            },
            {
                $lookup: {
                    from: "medico",
                    localField: "cit_medico",
                    foreignField: "med_nroMatriculaProsional",
                    as: "medicoData"
                }
            },
            {
                $unwind: "$medicoData"
            },
            {
                $lookup: {
                    from: "consultorio",
                    localField: "medicoData.med_consultorio",
                    foreignField: "cons_codigo",
                    as: "consultorioData"
                }
            },
            {
                $project: {
                    "_id": 0,
                    "consultorio": {
                        "codigo": "$consultorioData.cons_codigo",
                        "nombre": "$consultorioData.cons_nombre"
                    }
                }
            }
        ]).toArray();

        res.send(result);
    } catch (error) {
        next(error);
    }
};

// ? Obtener todas las citas realizadas por los pacientes de un genero si su estado de la cita fue atendidad 
export const citasAtendidasXgenero = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const result = await usuario.aggregate([{
                $match: {
                    "usu_genero": id
                }
            },
            {
                $lookup: {
                    from: "cita",
                    localField: "usu_id",
                    foreignField: "cit_datosUsuarios",
                    as: "citas"
                }
            },
            {
                $unwind: "$citas"
            },
            {
                $match: {
                    "citas.cit_estado": 4
                } 
            },
            {
                $project: {
                    "_id": 0,
                    "codigoCita": "$citas.cit_codigo",
                    "fechaCita": "$citas.cit_fecha",
                    "estadoCita": "$citas.cit_estado"
                }
            }
        ]).toArray();

        res.send(result);
    } catch (error) {
        next(error);
    }
};

//? Insertar un paciente a la tabla usuario pero si es menor de edad solicitar primero que ingrese el acudiente y validar si ya estaba registrado el acudiente. 

export const insertarPaciente = async (req, res, next) => {
    try {
        const pacienteData = req.body;
        const esMenorEdad = calcularEdad(pacienteData.fechaNacimiento) < 18;

        if (esMenorEdad) {
            const acudienteData = pacienteData.acudiente;
            const acudienteExistente = await acudiente.findOne({ acu_nombreCompleto: acudienteData.acu_nombreCompleto });

            if (!acudienteExistente) {
                const acudienteResult = await acudiente.insertOne(acudienteData);
                pacienteData.usu_acudiente = acudienteResult.insertedId;
            } else {
                pacienteData.usu_acudiente = acudienteExistente._id;
            }
        }

        const pacienteResult = await usuario.insertOne(pacienteData);
        res.status(201).json({ message: 'Paciente ingresado exitosamente', pacienteId: pacienteResult.insertedId });
    } catch (error) {
        next(error);
    }
};

//* Insertar un paciente a la tabla usuario pero si es menor de edad solicitar primero que ingrese el acudiente y validar si ya estaba registrado el acudiente. */
function calcularEdad(fechaNacimiento) {
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    const yearsDiff = today.getFullYear() - birthDate.getFullYear();
    
    if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
        return yearsDiff - 1;
    }
    
    return yearsDiff;
}
