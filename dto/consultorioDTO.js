import { check } from "express-validator";

export const GetAllConsultorios = [
    check("cons_codigo")
    .notEmpty().withMessage("El Codigo es Obligatorio")
    .isNumeric().withMessage("El Codigo debe ser de tipo Numerico"),

    check("cons_nombre")
    .notEmpty().withMessage("El Nombre del consultorio es Obligatorio")
    .isString().withMessage("El Nombre del consultorio debe ser de tipo String")
    .matches(/^[a-zA-Z]+$/).withMessage("Solo admite letras"),
]