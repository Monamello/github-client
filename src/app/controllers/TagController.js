import TagService from '../services/TagService';
import tagSchema from '../schemas/tagSchema';
import RepositoryTagService from '../services/RepositoryTagService';

class TagController{

  /**
  * List the Tag object.
  * @param {object} req request
  * @param {object} res response
  * @return {Array<Tag>} array with all tags.
  */
  async list(req, res){
    const tags = await TagService.list();
    return res.json(tags);
  }

  /**
  * Create the Tag object.
  * @param {object} req request
  * @param {object} res response
  * @return {Tag} the created Tag object.
  */
  async create(req, res){
    const {value: validatedBody, error: schemaError} = tagSchema.validate(req.body);

    if (schemaError) {
      return res.status(400).json({ error: schemaError.message});
    }

    const tag = await TagService.create(validatedBody);
    return res.json(tag);
  }

  /**
  * Update the tag object by id.
  * @param {object} req request
  * @param {object} res response
  * @return {Tag} the updated tag object.
  */
  async update(req, res){
    const { id } = req.params;
    const {value: validatedBody, error: schemaError} = tagSchema.validate(req.body);
    const exists = await TagService.listById(id);

    if (schemaError) {
      return res.status(400).json({ error: schemaError.message});
    }
    if (!exists) {
      return res.status(400).json({ error: 'Tag does not exist.'});
    }

    const tag = await TagService.update(id, validatedBody);
    return res.json(tag);
  }

  /**
  * Delete the tag object by id.
  * @param {object} req request
  * @param {object} res response
  * @return {response} the status code.
  */
  async delete(req, res) {
    const { id } = req.params;
    const exists = await TagService.listById(id);
    if (!exists) {
      return res.status(400).json({ error: 'Tag does not exist.'});
    }

    await RepositoryTagService.deleteObj(id);

    await TagService.delete(id)
    return res.status(204).send();

  }

  /**
  * Get repositories by tag name and similar name.
  * @param {object} req request
  * @param {object} res response
  * @return {Array<Repository>} array with repositories.
  */
  async getRepositories(req, res) {
    const { name } = req.query;

    const tags = await TagService.listByName(name);
    let repositories = []

    await Promise.all(tags.map(async (tag) => {
      repositories = repositories.concat(tag.repositories);
    }));

    return res.json(repositories);

  }

}

export default new TagController();