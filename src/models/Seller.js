const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Seller = sequelize.define('Seller', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

Seller.associate = function(models) {
    Seller.hasMany(models.Product);
};

module.exports = Seller;