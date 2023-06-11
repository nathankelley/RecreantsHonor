const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.User = require('./user.js')(mongoose);
db.Undead = require('./undead.js')(mongoose);

module.exports = db;