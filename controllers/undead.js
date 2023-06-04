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
      // const name = req.body.name;
      // const nameCheck = nameUtil.nameCheck(name);
      // if (nameCheck.error) {
      //   res.status(400).send({ message: nameCheck.error });
      //   return;
      // }
      const undead = new Undead(req.body);
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
      // const name = req.body.name;
      // const nameCheck = nameUtil.nameCheck(name);
      // if (nameCheck.error) {
      //   res.status(400).send({ message: nameCheck.error });
      //   return;
      // }
      Undead.findOne({ _id: undead_id }, function (err, undead) {
        undead.name = req.params.name;
        undead.image = req.body.image;
        undead.description = req.body.description;
        undead.health_points = req.body.health_points;
        undead.item_drop_chance = req.body.item_drop_chance;
        undead.undead_rating = req.body.undead_rating;
        undead.item_drops = req.body.item_drops;
        undead.save(function (err) {
          if (err) {
            res.status(500).json(err || 'Some error occurred while updating the undead.');
          } else {
            res.status(204).send();
          }
        });
      });
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
      Undead.deleteOne({ _id: undead_id })
        .then(() => { 
          res.status(204).send(result);
        })
        .catch((err) => {
          res.status(500).json(err || 'Some error occurred while deleting the undead.');
          })
    } catch (err) {
      res.status(500).json(err || 'Some error occurred while deleting the undead.');
    }
  };
