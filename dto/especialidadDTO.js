import { check } from "express-validator";

export const GetAllEspecialidades = [
    check("cod_especialidad")
    .notEmpty().withMessage("El Codigo es Obligatorio")
    .isNumeric().withMessage("El Codigo debe ser de tipo Numerico"),

    check("esp_nombre")
    .notEmpty().withMessage("El Nombre es Obligatorio")
    .isString().withMessage("El Nombre debe ser de tipo String")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$/).withMessage("Solo admite letras"),

]