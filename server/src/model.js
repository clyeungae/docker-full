const mysql = require('mysql2/promise');

let connection;

exports.init = async function (_opts) {
  const opts = _opts || {
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'dev'
  };
  connection = await mysql.createConnection(opts);

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });
}

exports.selectItem = async function (id) {
  const [rs] = await connection.execute(
    'SELECT * FROM `test` WHERE `id` = ?',
    [id]
  );

  if (rs.length === 0) throw new Error('not found');
  return rs[0];
}
