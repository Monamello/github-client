import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Tag from '../app/model/Tag';
import Repository from '../app/model/Repository';
import RepositoryTag from '../app/model/RepositoryTag';

const models = [Tag, Repository, RepositoryTag];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig.development);

    models
    .map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
