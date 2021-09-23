const express = require('express');
const mysql = require('mysql2');
const consoleTable = require('console.table');

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
// Run Application
const runApp = () => {
  inquirer
    .prompt({
      name: "",
      message: "",
      type: "",
      choices: [
      ]
    }).then(() => {

    })
}

// VIEW ALL EMPLOYEES
const viewAllEmployees = () => {
  db.query(`
  SELECT * FROM employee`, function (err, employees) {
    if (err) return console.log(err);
    // DISPLAY QUERY OF EMPLOYEES
    console.table(employees);
    runApp();
  });
}

// VIEW ALL EMPLOYEES BY ROLE
const viewAllRoles = () => {
  let roleEmployee = [];

  db.query(`
  SELECT title FROM role`, function (err, roles) {
    if (err) return console.log(err);
    // DISPLAY QUERY OF EMPLOYEES BY ROLE
    console.table(roles);
    runApp();
  });
}

// VIEW ALL EMPLOYEES BY DEPARTMENT
const viewAllDepartments = () => {
  let deptEmployee = [];

  db.query(`
  SELECT name FROM department`, function (err, depts) {
    if (err) return console.log(err);
    // DISPLAY QUERY OF EMPLOYEES BY DEPARTMENT
    console.table(depts);
    runApp();
  });
}


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