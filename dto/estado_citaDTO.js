import { check } from "express-validator";

export const GetAllEstados = [
    check("estcita_id")
    .notEmpty().withMessage("El Codigo es Obligatorio")
    .isNumeric().withMessage("El Codigo debe ser de tipo Numerico"),

    check("estcita_nombre")
    .notEmpty().withMessage("El Nombre de la Especialidad es Obligatorio")
    .isString().withMessage("El Nombre de la Especialidad debe ser de tipo String")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$/).withMessage("Solo admite letras"),

]