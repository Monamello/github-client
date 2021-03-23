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
}

export default Tag;