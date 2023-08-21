const { Op } = require('sequelize');
const Client = require('../models/Client');

const index = async(req, res) => {
    try {
        const client = await Client.findAll();
        return res.status(200).json({client});
    } catch (err) {
        return res.status(500).json({err});
    }
};

const show = async(req, res) => {
    const { id } = req.params;
    try {
        const client = await Client.findByPk(id);
        return res.status(200).json({user});
    } catch (err) {
        return res.status(500).json({err});
    }
};

const create = async(req, res) => {
    try {
        const newClient = {
            name: req.body.name,
            cpf: req.body.cpf,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        };

        const client = await Client.create(newClient);
        return res.status(201).json({message: "Cliente cadastrado com sucesso.", client: client});
    } catch (err) {
        res.status(500).json({error: err});
    }
};

const update = async(req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Client.update(req.body, {where: {id: id}});
        if (updated) {
            const client = await Client.findByPk(id);
            return res.status(200).send(client);
        }
        throw new Error();
    } catch (err) {
        return res.status(500).json("Cliente não encontrado.");
    }
};

const destroy = async(req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Client.destroy({where: {id: id}});
        if (deleted) {
            return res.status(200).json("Cliente apagado.");
        }
        throw new Error();
    } catch(err) {
        return res.status(500).json("Cliente não encontrado.");
    }
};

module.exports = {
    create,
    index,
    show,
    update,
    destroy,
}