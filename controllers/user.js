const db = require('../models');
const User = db.User;
const { authSchema, passwordHelper } = require('../helpers/validation');


// GET all undead
module.exports.getAll = (req, res) => {
  try {
    User.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};


// GET single contact
module.exports.getUser = (req, res) => {
  try {
    const user_id = req.params._id;
    User.find({ _id: user_id })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving the user.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

  
  
  // POST (write) a contact to the db
  module.exports.create = (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
          res.status(400).send({ message: 'Content can not be empty!' });
          return;
        }
        const password = req.body.password;
        const passwordCheck = passwordHelper.passwordPass(password);
        if (passwordCheck.error) {
          res.status(400).send({ message: passwordCheck.error });
          return;
        }
        const user = new User(req.body);
        user
          .save()
          .then((data) => {
            console.log(data);
            res.status(201).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || 'Some error occurred while creating the user.'
            });
          });
      } catch (err) {
        res.status(500).json(err);
      }
  };
  
  
  // UPDATE a contact in the db
  module.exports.updateUser = async (req, res) => {
    try {
      const user_id = req.params._id;
      if (!user_id) {
        res.status(400).send({ message: 'Invalid ID supplied' });
        return;
      }
      const password = req.body.password;
      const passwordCheck = passwordHelper.passwordPass(password);
      if (passwordCheck.error) {
        res.status(400).send({ message: passwordCheck.error });
        return;
      }
      User.replaceOne({ _id: user_id }, {
        username: req.params.username,
        password: req.body.password
      })
      .then(() => { 
        res.status(204).send();
      })
      .catch((err) => {
            res.status(500).json(err || 'Some error occurred while updating the user.');
          })
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  
  // DELETE a contact from the db
  module.exports.deleteUser = async (req, res) => {
    try {
      const user_id = req.params._id;
      if (!user_id) {
        res.status(400).send({ message: 'Invalid ID Supplied' });
        return;
      }
      User.deleteOne({ _id: user_id }).then(() => {
        res.status(204).send();
      }
      ).catch((err) => {
        res.status(500).json(err || 'Some error occurred while deleting the undead.');
      });
    } catch (err) {
      res.status(500).json(err || 'Some error occurred while deleting the undead.');
    }
  };