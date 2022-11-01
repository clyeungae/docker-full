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

exports.selectFlashCard = async function (id) {
  const [rs] = await connection.execute(
    'SELECT * FROM `flashcard` WHERE `id` = ?',
    [id]
  );

  if (rs.length === 0) throw new Error('flashcard not found');
  return rs[0];
}

exports.insertFlashCard = async function (keyword, answer) {
  const [rs] = await connection.execute(
    'INSERT INTO `flashcard` VALUES(NULL, ?, ?)',
    [keyword, answer]
  );

  if (rs.length === 0) throw new Error('flashcard not found');
  return rs[0];
}
