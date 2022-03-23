var mysql = require('mysql');

// 普通连接
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'onepiece'
// });

// 连接池
var pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'onepiece'
});

module.exports = pool