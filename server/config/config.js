var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
      development: {
        mongodb : {
           db: 'mongodb://localhost/multivision',
           rootPath: rootPath,
           port: process.env.PORT || 3060
        },
        postgres : {
           db: 'postgres://cyqaweeqtlgnhw:rB1RryqT3cDRdwp6OvvQ9GB6b6@ec2-54-225-83-198.compute-1.amazonaws.com:5432/d3rm9i30ao2l9v',
           rootPath: rootPath,
           port: process.env.PORT || 3060
        }
      },
      production: {
         mongodb : {
            rootPath: rootPath,
            db: 'mongodb://jeames:multivision@ds053178.mongolab.com:53178/multivision',
            port: process.env.PORT || 80
         },
         postgres : {
           db: 'postgres://cyqaweeqtlgnhw:rB1RryqT3cDRdwp6OvvQ9GB6b6@ec2-54-225-83-198.compute-1.amazonaws.com:5432/d3rm9i30ao2l9v',
           rootPath: rootPath,
           port: process.env.PORT || 3060
        }
      }
}