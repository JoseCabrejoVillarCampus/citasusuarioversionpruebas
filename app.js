import dotenv from 'dotenv';
import express from 'express';
import * as Routes from './routes/index.js';
import {appLogin} from './routes/login.js';

dotenv.config();
let app = express();
app.use(express.json());
//? Rutas Optencion Del Token
app.use('/login', appLogin);
app.use("/user", Routes.appUser);
//? Rutas Para Los Cruds De Todas Las Colecciones
app.use("/acudiente", Routes.appAcudiente);
app.use("/cita", Routes.appCita);
app.use("/consultorio", Routes.appConsultorio);
app.use("/especialidad", Routes.appEspecialidad);
app.use("/estado", Routes.appEstado);
app.use("/genero", Routes.appGenero);
app.use("/medico", Routes.appMedico);
app.use("/documento", Routes.appDocumento);
app.use("/usuario", Routes.appUsuario);
//? Rutas Consultas Especificas
app.use("/citaOrdenNumerico", Routes.appQuerys);
app.use("/patientOrderAlph", Routes.appQuerys);
app.use("/proxCitaUsuario", Routes.appQuerys);
app.use("/patientCitMedicoEspecifico", Routes.appQuerys);
app.use("/consultoriasPorCliente", Routes.appQuerys);
app.use("/medicoPorEspecialidad", Routes.appQuerys);
app.use("/citaDiaEspecifico", Routes.appQuerys);
app.use("/citaMedicoEspecifico", Routes.appQuerys);
app.use("/contarCitasMedicoDia", Routes.appQuerys);
app.use("/consultorioAplicadasCitasPacientes", Routes.appQuerys);
app.use("/citasAtendidasXgenero", Routes.appQuerys);

let config = JSON.parse(process.env.MY_SERVER);
console.log(config);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});