import { Router } from 'express';
import AuthenticationController from '../controller/authenticationController';

const routes = new Router();

routes.get('/login', AuthenticationController.redirectToLogin)

routes.get('/callback', AuthenticationController.callbackRoute)

routes.get('/user', AuthenticationController.getUserInfos)

export default routes;
