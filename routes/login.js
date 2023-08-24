import {limitLogin} from '../helpers/limit.js'
import {crearToken} from '../helpers/JWT.js'
import Routes from 'express';
import routesVersioning  from 'express-routes-versioning';
import { loginV1 } from '../apis/v1/loginV1.js'

const appLogin = Routes();
const version = routesVersioning();

appLogin.use(limitLogin(), crearToken);

appLogin.post('/', version({ 
    "1.0.0": loginV1,
}));
export {
    appLogin
};