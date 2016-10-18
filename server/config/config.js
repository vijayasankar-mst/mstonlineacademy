var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
      development: {
        postgres : {
           db: process.env.DATABASE_URL,
           rootPath: rootPath,
           port: process.env.PORT || 3060,
           sfoid: process.env.SF_OID
        }
      },
      production: {
         postgres : {
           db: process.env.DATABASE_URL,
           rootPath: rootPath,
           port: process.env.PORT || 3060,
           sfoid: process.env.SF_OID
        }
      }
}