const db = require('../models');
const Undead = db.Undead;
const { authSchema } = require('../helpers/validation');


// GET all undead
module.exports.getAll = (req, res) => {
  try {
    Undead.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving undead.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};


// GET single contact
module.exports.getUndead = (req, res) => {
  try {
    const undead_id = req.params._id;
    Undead.find({ _id: undead_id })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving undead.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

  
  
  // POST (write) a contact to the db
  module.exports.create = (req, res) => {
    try {
      if (!req.body.name || !req.body.description || !req.body.health_points || !req.body.item_drop_chance || !req.body.undead_rating) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
      }
      const undead = new Undead(req.body);
      validate(authSchema(undead));
      undead
        .save()
        .then((data) => {
          console.log(data);
          res.status(201).send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'Some error occurred while creating the undead.'
          });
        });
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  
  // UPDATE a contact in the db
  module.exports.updateUndead = async (req, res) => {
    try {
      const undead_id = req.params._id;
      if (!undead_id) {
        res.status(400).send({ message: 'Invalid ID Supplied' });
        return;
      }
      Undead.replaceOne({ _id: undead_id }, {
        name: req.params.name,
        image: req.body.image,
        description: req.body.description,
        health_points: req.body.health_points,
        item_drop_chance: req.body.item_drop_chance,
        undead_rating: req.body.undead_rating,
        item_drops: req.body.item_drops
      })
      .then(() => { 
        res.status(204).send();
      })
      .catch((err) => {
            res.status(500).json(err || 'Some error occurred while updating the undead.');
          })
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  
  // DELETE a contact from the db
  module.exports.deleteUndead = async (req, res) => {
    try {
      const undead_id = req.params._id;
      if (!undead_id) {
        res.status(400).send({ message: 'Invalid ID Supplied' });
        return;
      }
      Undead.deleteOne({ _id: undead_id }).then(() => {
        res.status(204).send();
      }
      ).catch((err) => {
        res.status(500).json(err || 'Some error occurred while deleting the undead.');
      });
    } catch (err) {
      res.status(500).json(err || 'Some error occurred while deleting the undead.');
    }
  };
