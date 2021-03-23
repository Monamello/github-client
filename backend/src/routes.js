import { Router } from 'express';
import AuthenticationController from './app/controller/AuthenticationController';
import RepositoryController from './app/controller/RepositoryController';
import TagController from './app/controller/TagController';

const routes = new Router();

routes.get('/login', AuthenticationController.redirectToLogin)

routes.get('/callback', AuthenticationController.callbackRoute)

routes.get('/user', AuthenticationController.getUserInfos)

routes.get('/repository/:user/:repo', RepositoryController.repository)

routes.get('/repositories/:user', RepositoryController.repositories)

routes.get('/repositories/:user/starred', RepositoryController.repositoriesStarred)

routes.get('/tag', TagController.list)

routes.post('/tag', TagController.create)

routes.put('/tag/:id', TagController.update)

routes.delete('/tag/:id', TagController.delete)

export default routes;
