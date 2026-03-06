// controllers/contacts.js 
const mongodb = require('../data/database.js');
const ObjectId = require('mongodb').ObjectId;

// Controller functions for handling contact-related operations
const getAllContacts = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    }).catch((err) => {
        res.status(500).json({ message: 'Error fetching contacts', error: err });
    });
};

const getContactById = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    }).catch((err) => {
        res.status(500).json({ message: 'Error fetching contacts', error: err });
    });
};

const createContact = async (req, res) => {
};

const updateContact = async (req, res) => {
};

const deleteContact = async (req, res) => {
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};
