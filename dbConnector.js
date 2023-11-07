import mysql from 'mysql2';

const db = mysql.createPool({
  host: 'localhost', 
  user: 'root',
  password: '12345678',
  database: 'numerical',
});


export default db;
