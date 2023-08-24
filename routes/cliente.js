import {limitUsuario} from '../helpers/limit.js'
import passportHelper from '../helpers/passPortHelper.js'
import Routes from 'express';
import routesVersioning  from 'express-routes-versioning';
import {userV1, userV11, getAcudienteAll,
    getAcudienteById, postAcudiente} from '../apis/v1/user.js'
import {userV2} from '../apis/v2/user.js'
import {userV3} from '../apis/v3/user.js'
//http://localhost:5010
const appUser = Routes();
const version = routesVersioning();
//Headers 'Authorization: Bearer ....'
appUser.use(limitUsuario(), passportHelper.authenticate('bearer', { session: false }));
//Headers 'Accept-Version: 1.0.0' 
appUser.get('/',  version({
    "1.0.0": getAcudienteAll,
}));
appUser.get('/:id', version({
    "1.0.1": getAcudienteById
}));
appUser.post('/', version({
    "1.1.0": postAcudiente
}));
export {
    appUser
};