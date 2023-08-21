const { Op } = require('sequelize');
const Order = require('../models/Order');
const Client = require('../models/Client');
const Product = require('../models/Product');

const index = async(req, res) => {
    try {
        const order = await Order.findAll();
        return res.status(200).json({order});
    } catch (err) {
        return res.status(500).json({err});
    }
};

const show = async(req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        return res.status(200).json({order});
    } catch (err) {
        return res.status(500).json({order});
    }
};

const create = async(req, res) => {
    try {
        const newOrder = {
            payment_method: req.body.payment_method,
            status: req.body.status
        };

        const order = await Order.create(newOrder);
        return res.status(201).json({message: "Pedido cadastrado com sucesso.", order: order});
    } catch (err) {
        res.status(500).json({error: err});
    }
};

const update = async(req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Order.update(req. body, {where: {id: id}});
        if (updated) {
            const order = await Order.findByPk(id);
            return res.status(200).send(order);
        }
        throw new Error();
    } catch (err) {
        return res.status(500).json("Pedido não encontrado.");
    }
};

const destroy = async(req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Order.destroy({where: {id: id}});
        if (deleted) {
            return res.status(200).json("Pedido apagado.");
        }
        throw new Error();
    } catch (err) {
        return res.status(500).json("Pedido não encontrado.");
    }
};

const addClient = async(req, res) => {
    const { cid, oid } = req.params;
    try {
        const order = await Order.findByPk(oid);
        await order.update({ClientId: cid});
        return res.status(200).json({message: "Cliente do pedido cadastrado."});
    } catch (err) {
        return res.status(500).json({err});
    }
};

const removeClient = async(req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        await order.update({ClientId: null});
        return res.status(200).json({message: "Cliente removido do pedido."});
    } catch (err) {
        return res.status(500).json({err});
    }
};

const addProduct = async(req, res) => {
    const { orderId, productId } = req.params;
    try {
        const order = await Order.findByPk(orderId);
        const product = await Product.findByPk(productId);
        await order.addProduct(product);
        return res.status(200).json({message: "Produto adicionado ao pedido."});
    } catch (err) {
        return res.status(500).json({err});
    }
};

const removeProduct = async(req, res) => {
    const { orderId, productId } = req.params;
    try {
        const order = await Order.findByPk(orderId);
        const product = await Product.findByPk(productId);
        await order.removeProduct(product);
        return res.status(200).json({message: "Produto removido do pedido."});
    } catch (err) {
        return res.status(500).json({err});
    }
};

module.exports = {
    create,
    index,
    show,
    update,
    destroy,
    addClient,
    removeClient,
    addProduct,
    removeProduct,
}