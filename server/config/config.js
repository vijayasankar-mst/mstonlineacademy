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
           db: 'postgres://ocfwqbfcokhmlm:_UdMkbnKaSUDbDUdN-iDj9CNyG@ec2-54-243-210-223.compute-1.amazonaws.com:5432/d9d7rcm1djt678',
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
           db: 'postgres://ocfwqbfcokhmlm:_UdMkbnKaSUDbDUdN-iDj9CNyG@ec2-54-243-210-223.compute-1.amazonaws.com:5432/d9d7rcm1djt678',
           rootPath: rootPath,
           port: process.env.PORT || 3060
        }
      }
}