const { Op } = require('sequelize');
const Product = require('../models/Product');

const index = async(req, res) => {
    try {
        const product = await Product.findAll();
        return res.status(200).json({product});
    } catch (err) {
        return res.status(500).json({err});
    }
};

const show = async(req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        return res.status(200).json({user});
    } catch (err) {
        return res.status(500).json({err});
    }
};

const create = async(req, res) => {
    try {
        const newProduct = {
            name: req.body.name,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price
        };

        const product = await Product.create(newProduct);
        return res.status(201).json({message: "Produto cadastrado com sucesso.", product: product});
    } catch (err) {
        res.status(500).json({error: err});
    }
}

const update = async(req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Product.update(req.body, {where: {id: id}});
        if (update) {
            const product = await Product.findByPk(id);
            return res.status(200).send(product);
        }
        throw new Error();
    } catch (err) {
        return res.status(500).json("Produto não encontrado.");
    }
};

const destroy = async(req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Product.destroy({where: {id: id}});
        if (deleted) {
            return res.status(200).json("Produto apagado.");
        }
        throw new Error();
    } catch(err) {
        return res.status(500).json("Produto não encontrado.");
    }
};

const listSellerProducts = async(req, res) => {
    const { id } = req.params;
    try {
        const seller = await Seller.findByPk(id);
        const listSellerProducts = await seller.getProduct();
        return res.status(200).json({listOrderProducts})
    } catch(err) {
        return res.status(500).json({err});
    }
};

const addProductSeller = async(req, res) => {
    const { pid, sid } = req.params;
    try {
        const product = await Product.findByPk(pid);
        await product.update({SellerId: sid});
        return res.status(200).json({message: "Vendedor do produto cadastrado."});
    } catch (err) {
        return res.status(500).json({err});
    }
};

const removeProductSeller = async(req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        await product.update({SellerId: null});
        return res.status(200).json({message: "Vendedor do produto removido."});
    } catch (err) {
        return res.status(500).json({err});
    }
};

const listOrderProducts = async(req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        const listOrderProducts = await order.getProduct();
        return res.status(200).json({listOrderProducts});
    } catch(err) {
        return res.status(500).json({err});
    }
};

module.exports = {
    create,
    index,
    show,
    update,
    destroy,
    addProductSeller,
    removeProductSeller,
    listSellerProducts,
    listOrderProducts,
}
