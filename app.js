import dotenv from 'dotenv';
import express from 'express';
import {appUser} from './routes/cliente.js';
import {appLogin} from './routes/login.js';

dotenv.config();
let app = express();
app.use(express.json());


app.use('/login', appLogin);
app.use("/user", appUser);

let config = JSON.parse(process.env.MY_SERVER);
console.log(config);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});

