import Tag from '../model/Tag';

class TagService{

    /**
     * Get all tags object into the database.
     * @return {Array<Tag>} sequelize model of Tag
     */
    list() {
        return Tag.findAll();
    }

    /**
     * Get the tag object into the database by id.
     * @param {integer} id
     * @return {Tag} sequelize model of Tag
     */
    listById(id) {
        return Tag.findByPk(id);
    }

    /**
     * Inserts the tag model into the database.
     * @param {string} body
     * @return {Tag} sequelize model of Tag
     */
    create(body) {
        const name = body.name;
        return Tag.findOrCreate({where: {name}});
    }

    /**
     * Update the tag object into the database by id.
     * @param {integer} id
     * @param {object} body
     * @return {Promise<Array<number>>} the number of affected rows
     */
    update(id, body) {
        return Tag.update(body, {where: {id}});
    }

    /**
     * Delete the tag object into the database by id.
     * @param {integer} id
     * @return {Promise<number>} the number of destroyed rows
     */
    delete(id) {
        return Tag.destroy({where: {id}});
    }

}

export default new TagService();