import { check } from "express-validator";

export const GetAllGeneros = [
    check("gen_id")
    .notEmpty().withMessage("El Codigo es Obligatorio")
    .isNumeric().withMessage("El Codigo debe ser de tipo Numerico"),

    check("gen_nombre")
    .notEmpty().withMessage("El Nombre del Genero es Obligatorio")
    .isString().withMessage("El Nombre del Genero debe ser de tipo String")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$/).withMessage("Solo admite letras"),

    check("gen_abreviatura")
    .notEmpty().withMessage("El Nombre de Abreviacion Genero es Obligatorio")
    .isString().withMessage("El Nombre de Abreviacion Genero debe ser de tipo String")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$/).withMessage("Solo admite letras")

]