import {limitUsuario} from '../helpers/limit.js'
import passportHelper from '../helpers/passPortHelper.js'
import Routes from 'express';
import routesVersioning  from 'express-routes-versioning';
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
import { citMedicoEspecific, citaOrderNum, medXespecialidad, patientConsult, patientOrderAlph, proxCitUsu } from '../apis/v1/querys.js';


const appUser = Routes();
const version = routesVersioning();
// ? Headers 'Authorization: Bearer ....'
appUser.use(limitUsuario(), passportHelper.authenticate('bearer', { session: false }));
// * Headers 'Accept-Version: 1.0.0' 
// ? Acudiente
appUser.get('/acudiente',  version({
    "1.0.0": getAcudienteAll,
}));
appUser.get('/acudiente/:id', version({
    "1.0.1": getAcudienteById
}));
appUser.post('/acudiente', version({
    "1.0.0": postAcudiente
}));
appUser.put('/acudiente/:id', version({
    "1.0.0": putAcudiente
}));
appUser.delete('/acudiente/:id', version({
    "1.0.0": delAcudiente
}));

// ? Cita
appUser.get('/cita',  version({
    "1.0.0": getCitaAll,
}));
appUser.get('/cita/:id', version({
    "1.0.1": getCitaById
}));
appUser.post('/cita', version({
    "1.0.0": postCita
}));
appUser.put('/cita/:id', version({
    "1.0.0": putCita
}));
appUser.delete('/cita/:id', version({
    "1.0.0": delCita
}));

// ? Consultorio
appUser.get('/consultorio',  version({
    "1.0.0": getConsultorioAll,
}));
appUser.get('/consultorio/:id', version({
    "1.0.1": getConsultorioById
}));
appUser.post('/consultorio', version({
    "1.0.0": postConsultorio
}));
appUser.put('/consultorio/:id', version({
    "1.0.0": putConsultorio
}));
appUser.delete('/consultorio/:id', version({
    "1.0.0": delConsultorio
}));

// ? Especialidad
appUser.get('/especialidad',  version({
    "1.0.0": getEspecialidadAll,
}));
appUser.get('/especialidad/:id', version({
    "1.0.1": getEspecialidadById
}));
appUser.post('/especialidad', version({
    "1.0.0": postEspecialidad
}));
appUser.put('/especialidad/:id', version({
    "1.0.0": putEspecialidad
}));
appUser.delete('/especialidad/:id', version({
    "1.0.0": delEspecialidad
}));

//? Estado Cita
appUser.get('/estado',  version({
    "1.0.0": getEstadoAll,
}));
appUser.get('/estado/:id', version({
    "1.0.1": getEstadoById
}));
appUser.post('/estado', version({
    "1.0.0": postEstado
}));
appUser.put('/estado/:id', version({
    "1.0.0": putEstado
}));
appUser.delete('/estado/:id', version({
    "1.0.0": delEstado
}));

//? Genero
appUser.get('/genero',  version({
    "1.0.0": getGeneroAll
}));
appUser.get('/genero/:id', version({
    "1.0.1": getGeneroById
}));
appUser.post('/genero', version({
    "1.0.0": postGenero
}));
appUser.put('/genero/:id', version({
    "1.0.0": putGenero
}));
appUser.delete('/genero/:id', version({
    "1.0.0": delGenero
}));

//? Medico
appUser.get('/medico',  version({
    "1.0.0": getMedicoAll
}));
appUser.get('/medico/:id', version({
    "1.0.1": getMedicoById
}));
appUser.post('/medico', version({
    "1.0.0": postMedico
}));
appUser.put('/medico/:id', version({
    "1.0.0": putMedico
}));
appUser.delete('/medico/:id', version({
    "1.0.0": delMedico
}));

//? Medico
appUser.get('/documento',  version({
    "1.0.0": getDocumentoAll
}));
appUser.get('/documento/:id', version({
    "1.0.1": getDocumentoById
}));
appUser.post('/documento', version({
    "1.0.0": postDocumento
}));
appUser.put('/documento/:id', version({
    "1.0.0": putDocumento
}));
appUser.delete('/documento/:id', version({
    "1.0.0": delDocumento
}));

//? Usuario
appUser.get('/usuario',  version({
    "1.0.0": getUsuarioAll
}));
appUser.get('/usuario/:id', version({
    "1.0.1": getUsuarioById
}));
appUser.post('/usuario', version({
    "1.0.0": postUsuario
}));
appUser.put('/usuario/:id', version({
    "1.0.0": putUsuario
}));
appUser.delete('/usuario/:id', version({
    "1.0.0": delUsuario
}));


//* Querys Especificas
//? Obtener todas las citas numericamente
appUser.get('/citaOrdenNumerico', version({
    "1.0.0": citaOrderNum
}));
//? Obtener todos los pacientes alfabéticamente
appUser.get('/patientOrderAlph', version({
    "1.0.0": patientOrderAlph
}));
//? Obtener todos los médicos de una especialidad específica (por ejemplo, 'Cardiología')
appUser.get('/medPorEspecialidad/:id', version({
    "1.0.0": medXespecialidad
}));
// ? Encontrar la próxima cita para un paciente específico (por ejemplo, el paciente con usu_id 1)
appUser.get('/proxCitaUsuario/:id', version({
    "1.0.0": proxCitUsu
}));
// ? Encontrar todos los pacientes que tienen citas con un médico específico (por ejemplo, el médico con med_nroMatriculaProsional 1)
appUser.get('/pacientesPorMedico', version({
    "1.0.0": citMedicoEspecific
}));
//? Obtener las consultorías para un paciente específico (por ejemplo, paciente con usu_id 1)
appUser.get('/pacientesConsultorias/:id', version({
    "1.0.0": patientConsult
}));
export {
    appUser
};