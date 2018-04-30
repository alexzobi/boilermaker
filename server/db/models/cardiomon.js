const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('cardiomon', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },

  health: {
    type: Sequelize.INTEGER,
    defaultValue: 50
  },

  attack: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  },

  defense: {
    type: Sequelize.INTEGER,
    defaultValue: 5
  },

  description: {
    type: Sequelize.STRING
  },

  imageUrl: {
    type: Sequelize.TEXT,
  },
});
