const Sequelize = require('sequelize');
const db = require('../db');

const userCardiomon = db.define('user_cardiomon', {
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
    xp: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
});

module.exports = userCardiomon;

