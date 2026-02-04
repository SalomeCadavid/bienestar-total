const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bienestar_total',
  port: 3306
});

module.exports = pool;

pool.getConnection()
  .then(() => console.log('✅ Conectado a MySQL'))
  .catch(err => console.error('❌ Error MySQL:', err));
