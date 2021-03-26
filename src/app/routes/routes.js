import { Router } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';
import TagController from '../controllers/TagController';
import RepositoryController from '../controllers/RepositoryController';


const routes = new Router();


routes.get('/login', AuthenticationController.redirectToLogin)

routes.get('/callback', AuthenticationController.callbackRoute)

routes.get('/user', AuthenticationController.getUserInfos)


routes.get('/tag', TagController.list)

routes.post('/tag', TagController.create)

routes.put('/tag/:id', TagController.update)

routes.delete('/tag/:id', TagController.delete)

routes.get('/tag/repositories', TagController.getRepositories);


routes.get('/repositories', RepositoryController.list)

routes.get('/repositories/:id', RepositoryController.getRepository)

routes.post('/repositories/:user', RepositoryController.create)

routes.post('/repository/:id', RepositoryController.addTags);

routes.get('/repositories/github/:user', RepositoryController.listGithub)


export default routes;
