import Sequelize, { Model } from 'sequelize';

class Tag extends Model {
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
          },
          {
            sequelize,
            tableName: 'tags',
          }
        );
      return this;
    }

    static associate(models) {
      this.belongsToMany(models.Repository,{
        onDelete: 'cascade',
        as: 'repositories',
        through: 'repository_tag',
        foreignKey: 'tag_id'
      });
    }
}

export default Tag;