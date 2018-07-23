const Sequelize = require('sequelize');
const mysqlconn = require('../config/mysqlconn');

var connection = new Sequelize(mysqlconn.local.database,
  mysqlconn.local.username,
  mysqlconn.local.password,
  mysqlconn.local.options
);



connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  Sequelize:Sequelize,
  sequelize:connection
};
