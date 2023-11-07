import express from 'express';
import db from './dbConnector.js';


function queryDatabase(sql, params, callback) {
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM test WHERE 1';
  const params = [];

  queryDatabase(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result && result.length > 0) {
      return res.json(result[0]);
    } else {
      return res.status(404).json({ error: 'No records found' });
    }
  });
});

app.post('/get/archive', (req, res) => {
  const sql = `SELECT jsonData FROM test WHERE name = ?`;
  const { name } = req.body;
  queryDatabase(sql, [name], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result && result.length > 0) {
      return res.json(result);
    } else {
      return res.status(404).json({ error: 'No records found' });
    }
  });
});

app.post('/post/archive', (req, res) => {
  const sql = `INSERT INTO test (id, name, jsonData) VALUES (NULL , ?, ?)`;
  const { name, jsonData} = req.body;

  queryDatabase(sql, [name, JSON.stringify(jsonData)], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Data inserted successfully' });
    } else {
      return res.status(500).json({ error: 'Data insertion failed' });
    }
  });
});

app.listen(1987, () => {
  console.log('server running at http://localhost:1987');
});