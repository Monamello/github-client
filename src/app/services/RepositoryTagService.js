import Repository from '../model/Repository';
import RepositoryTag from '../model/RepositoryTag';

class RepositoryTagService{

    /**
    * Delete repository-tag models from database.
    * @param {string} body
    * @return {Promise<number>} the number of destroyed rows
    */
   async deleteObj(id) {
    return await RepositoryTag.destroy({where: {tag_id: id}});
    }

    /**
    * Create repository-tag models in database.
    * @param {string} body
    * @return {RepositoryTag} sequelize model of RepositoryTag
    */
    async addTag(tag, id) {
        return await RepositoryTag.create({repository_id: id, tag_id: tag})
    }

    /**
    * Get RepositoryTag by id`s from db.
    * @param {string} tag
    * @param {string} id
    * @return {RepositoryTag} sequelize model of RepositoryTag
    */
    async getRepositoryTag(tag, id) {
        return await RepositoryTag.findOne({where: {repository_id: id, tag_id: tag}})
    }
}

export default new RepositoryTagService();