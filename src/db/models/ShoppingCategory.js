const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ShoppingCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line
    static associate(models) {
      // define association here
    }
  }
  ShoppingCategories.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ShoppingCategory',
    tableName: 'shopping_categories',
  });
  return ShoppingCategories;
};
