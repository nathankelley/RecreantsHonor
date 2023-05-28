const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const authSchema = require('../helpers/validation');


// GET all undead
const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('RecreantsHonor').collection('Undead').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// GET single contact
const getSingle = async (req, res, next) => {
    const undead_id = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('RecreantsHonor')
      .collection('Undead')
      .find({_id: undead_id});
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };
  
  
  // POST (write) a contact to the db
  const writeUndead = async (req, res) => {
    try {
      const undead = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        health_points: req.body.health_points,
        item_drop_chance: req.body.item_drop_chance,
        undead_rating: req.body.undead_rating,
        item_drops: req.body.item_drops
      };
      // validate undead
      const result = await authSchema.validateAsync(undead);
      // insert into mongodb
      const response = await mongodb.getDb().db('RecreantsHonor').collection('Undead').insertOne(undead);
      if (response.acknowledged) { res.status(201).json(response); }
    } catch (error) {
       if (error.isJoi === true) { error.status = 422; }
    }
  };
  
  
  // UPDATE a contact in the db
  const updateUndead = async (req, res) => {
  const undead_id = new ObjectId(req.params.id);
  
    const undead = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        health_points: req.body.health_points,
        item_drop_chance: req.body.item_drop_chance,
        undead_rating: req.body.undead_rating,
        item_drops: req.body.item_drops
    }
    const response = await mongodb
      .getDb()
      .db('RecreantsHonor')
      .collection('Undead')
      .replaceOne({ _id: undead_id }, undead);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occured while updating.');
    }
  }
  
  
  // DELETE a contact from the db
  const deleteUndead = async (req, res) => {
    const undead_id = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('RecreantsHonor').collection('Undead').remove({ _id: undead_id }, true);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occured while deleting.');
    }
  }

module.exports = { getAll, getSingle, writeUndead, updateUndead, deleteUndead };