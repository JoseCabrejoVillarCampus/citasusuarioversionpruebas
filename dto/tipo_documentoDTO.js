import { check } from "express-validator";

export const GetAllDocumentos = [
    check("tipdoc_id")
    .notEmpty().withMessage("El Codigo es Obligatorio")
    .isNumeric().withMessage("El Codigo debe ser de tipo Numerico"),

    check("tipdoc_nombre")
    .notEmpty().withMessage("El Nombre del Tipo de Documento es Obligatorio")
    .isString().withMessage("El Nombre del Tipo de Documento debe ser de tipo String")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$/).withMessage("Solo admite letras"),

    check("tipdoc_abreviatura")
    .notEmpty().withMessage("La Abreviacion del Documento es Obligatorio")
    .isString().withMessage("La Abreviacion del Documento debe ser de tipo String")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$/).withMessage("Solo admite letras"),
]