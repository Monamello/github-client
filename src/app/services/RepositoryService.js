import Repository from '../model/Repository';

class RepositoryService{

    /**
    * Inserts the repository model into the database.
    * @param {string} body
    * @return {Repository} sequelize model of Repository
    */
    async create(body) {
        const id = body.id_repository;
        return await Repository.findOrCreate({where: {id}, defaults: body});
    }

    /**
    * List repositories models from database.
    * @param {string} body
    * @return {Array<Repository>} sequelize model of Repository
    */
    async list() {
        return await Repository.findAll();
    }

    /**
    * List repositories models by id from database.
    * @param {string} body
    * @return {Repository} sequelize model of Repository
    */
    async listById(id) {
        return await Repository.findByPk(id, {include: 'tags'});
    }

}

export default new RepositoryService();