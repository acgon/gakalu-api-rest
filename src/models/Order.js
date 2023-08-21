const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Order = sequelize.define('Order', {
    payment_method: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Order.associate = function(models) {
    Order.belongsTo(models.Client);
}

Order.associate = function(models) {
    Order.belongsToMany(models.Product, {
        through: 'Contain',
        as: 'order',
        foreignKey: 'orderId'
    });
}

module.exports = Order;