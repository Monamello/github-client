import { Router } from 'express';
import AuthenticationController from '../controller/authenticationController';
import RepositoryController from '../controller/repositoryController';

const routes = new Router();

routes.get('/login', AuthenticationController.redirectToLogin)

routes.get('/callback', AuthenticationController.callbackRoute)

routes.get('/user', AuthenticationController.getUserInfos)

routes.get('/repository/:user/:repo', RepositoryController.repository)

routes.get('/repositories/:user', RepositoryController.repositories)

routes.get('/repositories/:user/starred', RepositoryController.repositoriesStarred)

export default routes;
