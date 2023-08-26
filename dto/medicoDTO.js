import { check } from "express-validator";

export const GetAllMedicos = [
    check("med_nroMatriculaProsional")
    .notEmpty().withMessage("El Codigo del medico es Obligatorio")
    .isNumeric().withMessage("El Codigo del medico debe ser de tipo Numerico"),

    check("med_nombreCompleto")
    .notEmpty().withMessage("El Nombre del Medico es Obligatorio")
    .isString().withMessage("El Nombre del Medico debe ser de tipo String")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$/).withMessage("Solo admite letras"),

    check("med_consultorio")
    .notEmpty().withMessage("El Codigo del Consultorio es Obligatorio")
    .isNumeric().withMessage("El Codigo del Consultorio debe ser de tipo Numerico"),

    check("med_especialidad")
    .notEmpty().withMessage("El Codigo de la Especialidad es Obligatorio")
    .isNumeric().withMessage("El Codigo de la Especialidad debe ser de tipo Numerico"),

]