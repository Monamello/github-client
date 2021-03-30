import axios from 'axios';
import RepositoryService from '../services/RepositoryService';
import RepositoryTagService from '../services/RepositoryTagService';
import repositorySchema from '../schemas/repositorySchema';
import TagService from '../services/TagService';

class RepositoryController {

  /**
   * Get repositories from Github and create the
   * repositories objects.
   * @param {object} req request
   * @param {object} res response
   * @return {Array<Repository>} array with all repositories objects.
   */
    async create(req, res){
        const { user } = req.params;
        const repositories = await axios({
            method: 'get',
            url: `https://api.github.com/users/${user}/starred`,

        })

        const response = await Promise.all(repositories.data.map( async repository => {
            const body =  {
                'name': repository.name,
                'id_repository': repository.id,
                'description': String(repository.description),
                'url': repository.url
            }

            const {value: validatedBody, error: schemaError} = repositorySchema.validate(body);

            if (schemaError) {
                return res.status(400).json({ error: schemaError.message});
            }

            await RepositoryService.create(validatedBody);

            return validatedBody;
        }))

        return res.json(response);
    }

    /**
    * List all repositories objects.
    * @param {object} req request
    * @param {object} res response
    * @return {Array<Repository>} array with all repositories.
    */
    async list(req, res){
        const repositories = await RepositoryService.list();
        return res.json(repositories);
    }

    /**
    * Get repository by id.
    * @param {object} req request
    * @param {object} res response
    * @return {Repository} repository object.
    */
    async getRepository(req, res) {
        const { id } = req.params;
        const repository = await RepositoryService.listById(id);
        return res.json(repository);
    }

    /**
    * Get repositories from github and list all.
    * @param {object} req request
    * @param {object} res response
    * @return {Array<Repository>} array with all repositories from github.
    */
    async listGithub(req, res) {
        const { user } = req.params;
        axios({
            method: 'get',
            url: `https://api.github.com/users/${user}/starred`,
        }).then((response) => {
            return res.json(response.data.map((repositories) => {
                return {
                    id_repo: repositories.id,
                    name: repositories.name,
                    description: repositories.description,
                    url: repositories.owner.url
                }}));
            })
    }

    /**
    * Get tag list and add in repository object.
    * @param {object} req request
    * @param {object} res response
    * @return {Repository} repository object and its tags.
    */
    async addTags(req, res){
        const id_repository = req.params.id;
        const tags = req.body;

        const validRepo = await RepositoryService.listById(id_repository);
        if (!validRepo) {
            return res.status(404).json({ error: 'Repository does not exist.'})
        }

        await Promise.all(tags.map(async (tag) => {
            const validTag = await TagService.create(tag);

            const exists = await RepositoryTagService.getRepositoryTag(validTag.id, id_repository);
            if (exists) {
                return res.status(400).json({ error: `Tag ${validTag.name} is already related to this repository.`})
            }
            await RepositoryTagService.addTag(validTag.id, id_repository);

        }));

        const repository = await RepositoryService.listById(id_repository);
        return res.json(repository);
    }
}

export default new RepositoryController();