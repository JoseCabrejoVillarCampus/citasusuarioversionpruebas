import { check } from "express-validator";

export const GetAllUsuarios = [
    check("usu_id")
    .notEmpty().withMessage("El Codigo es Obligatorio")
    .isNumeric().withMessage("El Codigo debe ser de tipo Numerico"),

    check("usu_nombre")
    .notEmpty().withMessage("El Nombre del Usuario es Obligatorio")
    .isString().withMessage("El Nombre del Usuario debe ser de tipo String")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$/).withMessage("Solo admite letras"),

    check("segundo_nombre")
    .notEmpty().withMessage("El Segundo Nombre del Usuario es Obligatorio")
    .isString().withMessage("El Segundo Nombre del Usuario debe ser de tipo String")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$/).withMessage("Solo admite letras"),
    
    check("usu_primer_apellido_usur")
    .notEmpty().withMessage("El Apellido del Usuario es Obligatorio")
    .isString().withMessage("El Apellido del Usuario debe ser de tipo String")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$/).withMessage("Solo admite letras"),

    check("usu_segdo_apellido_usur")
    .notEmpty().withMessage("El Segundo Apellido del Usuario es Obligatorio")
    .isString().withMessage("El Segundo Apellido del Usuario debe ser de tipo String")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$/).withMessage("Solo admite letras"),

    check("usu_telefono")
    .notEmpty().withMessage("El Telefono del usuario es Obligatorio")
    .isString().withMessage("El Telefono del usuario debe ser de tipo String")
    .matches(/^[0-9,.#@\\s-]+$/).withMessage("Solo admite números e indicadores de zona"),

    check("usu_direccion")
    .notEmpty().withMessage("La Direccion del Usuario es Obligatorio")
    .isString().withMessage("La Direccion del Usuario debe ser de tipo String")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$/).withMessage("Solo admite letras"),

    check("usu_email")
    .notEmpty().withMessage("El email del Usuario es Obligatorio")
    .isString().withMessage("El email del usuario debe ser de tipo String")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/).withMessage("Solo admite letras"),

    check("usu_genero")
    .notEmpty().withMessage("El Codigo de Genero es Obligatorio")
    .isNumeric().withMessage("El Codigode Genero debe ser de tipo Numerico"),

    check("usu_acudiente")
    .notEmpty().withMessage("El Codigo de Acudiente es Obligatorio")
    .isNumeric().withMessage("El Codigo de Acudiente debe ser de tipo Numerico"),
]