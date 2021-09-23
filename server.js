const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
  );
  

  // COMMAND-LINE PROMPTS
  
  // SELECT QUERIES FROM ROLE, DEPARTMENT, EMPLOYEE
  db.query(`
  SELECT * FROM role`, function (err, role) {
    if (err) return console.log(err);
    console.table(role);
  });
  
  db.query(`
  SELECT * FROM department`, function (err, department) {
    if (err) return console.log(err);
    console.table(department);
  });
  
  db.query(`
  SELECT * FROM employee`, function (err, employee) {
    if (err) return console.log(err);
    console.table(employee);
  });
  
  
  // DELETE QUERIES FROM ROLE, DEPARTMENT, EMPLOYEE
  db.query(`
  DELETE FROM role WHERE id = ?`, 2, function (err, results) {
    console.log(results);
  });
  
  db.query(`
  DELETE FROM department WHERE id = ?`, 2, function (err, results) {
    console.log(results);
  });
  db.query(`
  
  DELETE FROM employee WHERE id = ?`, 2, function (err, results) {
    console.log(results);
  });
  
  // UPDATE QUERIES FROM ROLE, DEPARTMENT, EMPLOYEE
  db.query(`
  UPDATE role SET title = "Manager" WHERE id = ?`, 1, function (err, results) {
    console.log(results);
  });
  
  db.query(`
  UPDATE department SET name = "Engineering" WHERE id = ?`, 1, function (err, results) {
    console.log(results);
  });
  
  db.query(`
  UPDATE employee SET first_name = "Bob" WHERE id = ?`, 1, function (err, results) {
    console.log(results);
  });
  
  // app.use(express.static('public'));
  // app.use(express.urlencoded({ extended: true }));
  // app.use(express.json());
  
  // app.listen(PORT, () => {
  //     console.log(`Server running on port http://localhost:${PORT}`);
  // })
  
  // app.use((req, res) => {
  //     res.status(404).end();
  //   });