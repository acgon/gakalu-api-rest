const { Op } = require('sequelize');
const Seller = require('../models/Seller');

const index = async(req, res) => {
    try {
        const seller = await Seller.findAll();
        return res.status(200).json({seller});
    } catch (err) {
        return res.status(500).json({err});
    }
};

const show = async(req, res) => {
    const { id } = req.params;
    try {
        const seller = await Seller.findByPk(id);
        return res.status(200).json({seller});
    } catch (err) {
        return res.status(500).json({err});
    }
};

const create = async(req, res) => {
    try {
        const newSeller = {
            name: req.body.name,
            cnpj: req.body.cnpj,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        };

        const seller = await Seller.create(newSeller);
        return res.status(201).json({message: "Vendedor cadastrado com sucesso.", seller: seller});
    } catch (err) {
        res.status(500).json({error: err});
    }
}

const update = async(req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Seller.update(req.body, {where: {id: id}});
        if (updated) {
            const seller = await Seller.findByPk(id);
            return res.status(200).send(seller);
        }
        throw new Error();
    } catch (err) {
        return res.status(500).json("Vendedor não encontrado.");
    }
};

const destroy = async(req, res) => {
    const { id } = req.params;
    try { 
        const deleted = await Seller.destroy({where: {id: id}});
        if (deleted) {
            return res.status(200).json("Vendedor apagado.");
        }
        throw new Error();
    } catch(err) {
        return res.status(500).json("Vendedor não encontrado.");
    }
};

module.exports = {
    create,
    index,
    show,
    update,
    destroy,
}