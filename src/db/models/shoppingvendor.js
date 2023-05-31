const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ShoppingVendor extends Model {
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
  ShoppingVendor.init({
    name: DataTypes.STRING,
    contactEmail: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'ShoppingVendor',
  });

  return ShoppingVendor;
};
