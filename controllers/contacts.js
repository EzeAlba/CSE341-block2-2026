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
    const newContact = req.body;
    const result = await mongodb.getDatabase().db().collection('contacts').insertOne(newContact);
    if (result.acknowledged) {
        res.status(201).json({ message: 'Contact created', contactId: result.insertedId });
    } else {
        res.status(500).json({ message: 'Error creating contact' });
    }
};

const updateContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const updatedContact = req.body;
    const result = await mongodb.getDatabase().db().collection('contacts').updateOne({ _id: contactId }, { $set: updatedContact });
    if (result.modifiedCount > 0) {
        res.status(200).json({ message: 'Contact updated' });
    } else {
        res.status(500).json({ message: 'Error updating contact' });
    }
};

const deleteContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });
    if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Contact deleted' });
    } else {
        res.status(500).json({ message: 'Error deleting contact' });
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};
