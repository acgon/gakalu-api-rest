const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }

});

Product.associate = function(models) {
    Product.belongsTo(models.Seller);
};

Product.associate = function(models) {
    Product.belongsToMany(models.Order, {
        through: 'Contain',
        as: 'product',
        foreignKey: 'productId'
    });
};

module.exports = Product;