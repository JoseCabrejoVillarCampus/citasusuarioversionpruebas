import { check } from "express-validator";

export const GetAllCitas = [
    check("cit_codigo")
    .notEmpty().withMessage("El Codigo es Obligatorio")
    .isNumeric().withMessage("El Codigo debe ser de tipo Numerico"),

    check("cit_fecha")
    .notEmpty().withMessage("La fecha es Obligatoria")
    .isDate().withMessage("La fechae debe ser de tipo Date"),

    check("cit_estado")
    .notEmpty().withMessage("El Estado de la cita es Obligatorio")
    .isNumeric().withMessage("El Estado de la cita debe ser de tipo Numerico"),

    check("cit_medico")
    .notEmpty().withMessage("El Codigo del Medico de la cita es Obligatorio")
    .isNumeric().withMessage("El Codigo del Medico de la cita debe ser de tipo Numerico"),

    check("cit_datosUsuarios")
    .notEmpty().withMessage("El Codigo del Usuario de la cita es Obligatorio")
    .isNumeric().withMessage("El Codigo del Usuario de la cita debe ser de tipo Numerico"),
]