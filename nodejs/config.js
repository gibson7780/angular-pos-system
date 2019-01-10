'use strict';
// var path = require('path');

var config = {
  // server port, in this case: 9006
  port: 9006,
  postgres: {
    host: '172.17.0.2',
    user: 'postgres',
    database: 'postgres',
    password: '11111111',
    port: 5432
  }
};

module.exports = config;
