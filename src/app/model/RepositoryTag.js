import Sequelize, { Model } from 'sequelize';

class RepositoryTag extends Model {
    static init(sequelize){
        super.init({
            repository_id: {
                type:Sequelize.INTEGER,
                primaryKey: true
            },
            tag_id: {
                type:Sequelize.INTEGER,
                primaryKey: true
            }
          },
          {
            sequelize,
            tableName: 'repository_tag',
          }
        );
      return this;
    }
}

export default RepositoryTag;