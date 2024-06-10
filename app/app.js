const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'nodedb'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
  
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `;
  
  connection.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Table created or exists already');
  });
});

app.get('/', (req, res) => {
  const insertQuery = `INSERT INTO people(name) values('Full Cycle')`;
  connection.query(insertQuery, (err, result) => {
    if (err) throw err;

    const selectQuery = `SELECT name FROM people`;
    connection.query(selectQuery, (err, results) => {
      if (err) throw err;

      let response = '<h1>Full Cycle Rocks!</h1><ul>';
      results.forEach((person) => {
        response += `<li>${person.name}</li>`;
      });
      response += '</ul>';
      res.send(response);
    });
  });
});

app.listen(port, console.log(`Server running on port ${port}`));
