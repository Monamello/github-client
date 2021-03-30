import Sequelize, { Model } from 'sequelize';

class Repository extends Model {
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            id_repository: Sequelize.INTEGER,
            description: Sequelize.STRING,
            url: Sequelize.STRING,
          },
          {
            sequelize,
            tableName: 'repositories',
          }
        );
      return this;
    }
    static associate(models) {
      this.belongsToMany(models.Tag, {
        as: 'tags',
        through: 'repository_tag',
        foreignKey: 'repository_id'
      });
    }
}

export default Repository;