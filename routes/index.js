import {limitUsuario} from '../helpers/limit.js'
import passportHelper from '../helpers/passPortHelper.js'
import Routes from 'express';
import routesVersioning  from 'express-routes-versioning';
//* Importacion de los Metodos para todas las Colecciones
import {delAcudiente, getAcudienteAll,
    getAcudienteById, postAcudiente, putAcudiente} from '../apis/v1/acudiente.js'
import { delCita, getCitaAll, postCita, putCita, getCitaById } from '../apis/v1/cita.js';
import { delConsultorio, getConsultorioAll, getConsultorioById, postConsultorio, putConsultorio } from '../apis/v1/consultorio.js';
import { delEspecialidad, getEspecialidadAll, getEspecialidadById, postEspecialidad, putEspecialidad } from '../apis/v1/especialidad.js';
import { delEstado, getEstadoAll, getEstadoById, postEstado, putEstado } from '../apis/v1/estado_cita.js';
import { delGenero, getGeneroAll, getGeneroById, postGenero, putGenero } from '../apis/v1/genero.js';
import { delMedico, getMedicoAll, getMedicoById, postMedico, putMedico } from '../apis/v1/medico.js';
import { delDocumento, getDocumentoAll, getDocumentoById, postDocumento, putDocumento } from '../apis/v1/tipo_documento.js';
import { delUsuario, getUsuarioAll, getUsuarioById, postUsuario, putUsuario } from '../apis/v1/usuario.js';
//* Importacion de los Metodos para las Consultas Especificas
import { insertarPaciente, citasAtendidasXgenero, consultorioAplicadasCitasPacientes, contarCitasMedicoDia, medicoXConsultorio, citMedicoEspecifico, citaOrderNum, medXespecialidad, patientConsult, patientOrderAlph, proxCitUsu, citDiaEspecifico } from '../apis/v1/querys.js';
//* Importacion de los middleware de las Validaciones nativas de express
import { GetAllAcudientes } from '../dto/acudienteDTO.js';
import { GetAllCitas } from '../dto/citaDTO.js';
import { GetAllConsultorios } from '../dto/consultorioDTO.js';
import { GetAllEspecialidades } from '../dto/especialidadDTO.js';
import { GetAllEstados } from '../dto/estado_citaDTO.js';
import { GetAllGeneros } from '../dto/generoDTO.js';
import { GetAllMedicos } from '../dto/medicoDTO.js';
import { GetAllDocumentos } from '../dto/tipo_documentoDTO.js';
import { GetAllUsuarios } from '../dto/usuarioDTO.js';

const appUser = Routes();
const appAcudiente= Routes();
const appUsuario=Routes();
const appCita= Routes();
const appConsultorio= Routes();
const appEspecialidad = Routes();
const appEstado = Routes();
const appGenero = Routes();
const appMedico = Routes();
const appDocumento = Routes();
const appQuerys = Routes(); 

const version = routesVersioning();

// ? Headers 'Authorization: Bearer ....'
appUser.use(limitUsuario(), passportHelper.authenticate('bearer', { session: false }));
// * Headers 'Accept-Version: 1.0.0' 
// ? Acudiente
appAcudiente.get('/:id?', GetAllAcudientes ,version({
    "1.0.0": getAcudienteAll,
    "1.0.1": getAcudienteById
}));
appAcudiente.post('/', GetAllAcudientes, version({
    "1.0.0": postAcudiente
}));
appAcudiente.put('/:id', GetAllAcudientes, version({
    "1.0.0": putAcudiente
}));
appAcudiente.delete('/:id', GetAllAcudientes , version({
    "1.0.0": delAcudiente
}));

// ? Cita
appCita.get('/:id?', GetAllCitas, version({
    "1.0.0": getCitaAll,
    "1.0.1": getCitaById
}));
appCita.post('/', GetAllCitas, version({
    "1.0.0": postCita
}));
appCita.put('/:id', GetAllCitas, version({
    "1.0.0": putCita
}));
appCita.delete('/:id', GetAllCitas, version({
    "1.0.0": delCita
}));

// ? Consultorio
appConsultorio.get('/:id?', GetAllConsultorios, version({
    "1.0.0": getConsultorioAll,
    "1.0.1": getConsultorioById
}));
appConsultorio.post('/', GetAllConsultorios, version({
    "1.0.0": postConsultorio
}));
appConsultorio.put('/:id', GetAllConsultorios, version({
    "1.0.0": putConsultorio
}));
appConsultorio.delete('/:id', GetAllConsultorios, version({
    "1.0.0": delConsultorio
}));

// ? Especialidad
appEspecialidad.get('/:id?', GetAllEspecialidades, version({
    "1.0.0": getEspecialidadAll,
    "1.0.1": getEspecialidadById
}));
appEspecialidad.post('/', GetAllEspecialidades, version({
    "1.0.0": postEspecialidad
}));
appEspecialidad.put('/:id', GetAllEspecialidades, version({
    "1.0.0": putEspecialidad
}));
appEspecialidad.delete('/:id', GetAllEspecialidades, version({
    "1.0.0": delEspecialidad
}));

//? Estado Cita
appEstado.get('/:id?', GetAllEstados , version({
    "1.0.0": getEstadoAll,
    "1.0.1": getEstadoById
}));
appUser.post('/', GetAllEstados ,version({
    "1.0.0": postEstado
}));
appEstado.put('/:id', GetAllEstados, version({
    "1.0.0": putEstado
}));
appEstado.delete('/:id', GetAllEstados, version({
    "1.0.0": delEstado
}));

//? Genero
appGenero.get('/:id?', GetAllGeneros, version({
    "1.0.0": getGeneroAll,
    "1.0.1": getGeneroById
}));
appGenero.post('/', GetAllGeneros, version({
    "1.0.0": postGenero
}));
appGenero.put('/:id', GetAllGeneros, version({
    "1.0.0": putGenero
}));
appGenero.delete('/:id', GetAllGeneros, version({
    "1.0.0": delGenero
}));

//? Medico
appMedico.get('/:id?', GetAllMedicos, version({
    "1.0.0": getMedicoAll,
    "1.0.1": getMedicoById
}));
appMedico.post('/', GetAllMedicos, version({
    "1.0.0": postMedico
}));
appMedico.put('/:id', GetAllMedicos, version({
    "1.0.0": putMedico
}));
appMedico.delete('/:id', GetAllMedicos, version({
    "1.0.0": delMedico
}));

//? Documento
appDocumento.get('/:id?',  GetAllDocumentos, version({
    "1.0.0": getDocumentoAll,
    "1.0.1": getDocumentoById
}));
appDocumento.post('/', GetAllDocumentos, version({
    "1.0.0": postDocumento
}));
appDocumento.put('/:id', GetAllDocumentos, version({
    "1.0.0": putDocumento
}));
appDocumento.delete('/:id', GetAllDocumentos, version({
    "1.0.0": delDocumento
}));

//? Usuario
appUsuario.get('/:id?',  GetAllUsuarios, version({
    "1.0.0": getUsuarioAll,
    "1.0.1": getUsuarioById
}));
appUsuario.post('/', GetAllUsuarios, version({
    "1.0.0": postUsuario
}));
appUsuario.put('/:id', GetAllUsuarios, version({
    "1.0.0": putUsuario
}));
appUsuario.delete('/:id', GetAllUsuarios, version({
    "1.0.0": delUsuario
}));


//* Querys Especificas

appQuerys.get('/:id?/:medicoNroMatriculaProfesional?', version({
    "1.0.0": citaOrderNum,//? Obtener todas las citas numericamente
    "1.1.0": proxCitUsu, // ? Encontrar la próxima cita para un paciente específico (por ejemplo, el paciente con usu_id 1)
    "1.2.0": citDiaEspecifico, // ? Encontrar todas las citas para un día específico (por ejemplo, '2023-02-02')
    "1.3.0": consultorioAplicadasCitasPacientes,// ? Obtener los consultorio donde se aplicó las citas de un paciente
    "1.4.0": citasAtendidasXgenero,// ? Obtener todas las citas realizadas por los pacientes de un genero si su estado de la cita fue atendidad 
    "2.0.0": patientOrderAlph,//? Obtener todos los pacientes alfabéticamente
    "2.1.0": citMedicoEspecifico,// ? Encontrar todos los pacientes que tienen citas con un médico específico (por ejemplo, el médico con med_nroMatriculaProsional 1)
    "2.2.0": patientConsult,//? Obtener las consultorías para un paciente específico (por ejemplo, paciente con usu_id 1)
    "3.0.0": medXespecialidad,//? Obtener todos los médicos de una especialidad específica (por ejemplo, 'Cardiología')
    "3.1.0": medicoXConsultorio, // ? Obtener los médicos y sus consultorios
    "3.2.0": contarCitasMedicoDia, // ? Contar el número de citas que un médico tiene en un día específico (por ejemplo, el médico con med_nroMatriculaProsional 1 en '2023-07-12')
}));

appQuerys.post('/', version({
    "1.0.0": insertarPaciente//? Insertar un paciente a la tabla usuario pero si es menor de edad solicitar primero que ingrese el acudiente y validar si ya estaba registrado el acudiente.
}));


//*Exportamos las apps hacia app.js en la parte principal del codigo
export {
    appUser,
    appAcudiente,
    appUsuario,
    appCita,
    appConsultorio,
    appEspecialidad,
    appEstado,
    appGenero,
    appMedico,
    appDocumento,
    appQuerys
};