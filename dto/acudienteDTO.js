import { check } from "express-validator";

export const GetAllAcudientes = [
    check("acu_codigo")
    .notEmpty().withMessage("El Codigo es Obligatorio")
    .isNumeric().withMessage("El Codigo debe ser de tipo Numerico"),

    check("acu_nombreCompleto")
    .notEmpty().withMessage("El Nombre es Obligatorio")
    .isString().withMessage("El Nombre debe ser de tipo String")
    .matches(/^[a-zA-Z]+$/).withMessage("Solo admite letras"),

    check("acu_telefono")
    .notEmpty().withMessage("El Telefono es Obligatorio")
    .isNumeric().withMessage("El Telefono debe ser de tipo Numerico"),

    check("acu_direccion")
    .notEmpty().withMessage("El Direccion es Obligatorio")
    .isNumeric().withMessage("El Direccion debe ser de tipo Numerico"),  
]