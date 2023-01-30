module.exports = (sequelize, DataTypes) => {
  const salesProduct = sequelize.define(
  'SalesProduct', {
      saleId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
    }, {
      underscored: true,
      tableName: 'sales_products',
      timestamps: false,
    },
);
  salesProduct.associate = (models) => {
      models.Sale.belongsToMany(models.Product, {
        foreignKey: 'saleId', otherKey: 'productId' , as: 'sales', through: salesProduct,
      });
      models.Product.belongsToMany(models.Sale, {
      foreignKey: 'productId', otherKey: 'saleId' , as: 'products', through: salesProduct,
    })
  };
  return salesProduct;
};
