const express = require('express');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const inquirer = require('inquirer');

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

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// COMMAND-LINE PROMPTS
const startApp = () => {
  inquirer
    .prompt({
      name: "Start Menu",
      message: "Welcome to the Start Menu!",
      type: "list",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
      ]
    }).then((selected) => {
        switch (selected.action) {
          case "view all departments":
            viewAllDepts();
          break;

          case "view all roles":
            viewAllRoles();
          break;

          case "view all employees":
            viewAllEmployees();
          break;

          case "add a department":
            addDept();
          break;

          case "add a role":
            addRole();
          break;

          case "add an employee":
            addEmployee();
          break;

          case "update an employee role":
            updateRole();
          break;
        };
    });
};

// VIEW ALL DEPARTMENTS
const viewAllDepts = () => {
  db.query(`
  SELECT * FROM departments`, function (err, depts) {
    if (err) return console.log(err);
    // DISPLAY QUERY OF DEPARTMENTS
    console.table(depts);
    // RESTART APP
    startApp();
  });
}

// VIEW ALL ROLES
const viewAllRoles = () => {
  db.query(`
  SELECT * FROM roles`, function (err, roles) {
    if (err) return console.log(err);
    // DISPLAY QUERY OF ROLES
    console.table(roles);
    // RESTART APP
    startApp();
  });
}

// VIEW ALL EMPLOYEES
const viewAllEmployees = () => {
  db.query(`
  SELECT * FROM employees`, function (err, employees) {
    if (err) return console.log(err);
    // DISPLAY QUERY OF EMPLOYEES
    console.table(employees);
    // RESTART APP
    startApp();
  });
}

// ADD A DEPARTMENT
const addDept = () => {
  db.query(`
  INSERT INTO departments (name) VALUE ('IT')`, function (err, newDept) {
    if (err) return console.log(err);
    console.log("New department added!");
    // DISPLAY QUERY OF NEW DEPARTMENT
    console.table(newDept);
    // RESTART APP
    startApp();
  });
}

// ADD A ROLE
const addRole = () => {
  db.query(`
  INSERT INTO roles (title, salary, department_id) VALUE ('Account Manager', 95000, 4)`, function (err, newRole) {
    if (err) return console.log(err);
    console.log("New role added!");
    // DISPLAY QUERY OF NEW ROLE
    console.table(newRole);
    // RESTART APP
    startApp();
  })
}

// ADD AN EMPLOYEE
const addEmployee = () => {
  db.query(`
  INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUE ('Cindy', 'Baker', 4, 0)`, function (err, newEmployee) {
    if (err) return console.log(err);
    console.log("New employee added!");
    // DISPLAY QUERY OF NEW ROLE
    console.table(newEmployee);
    // RESTART APP
    startApp();
  })
}

// UPDATE AN EMPLOYEE ROLE
const updateRole = () => {
  db.query(`
  UPDATE roles SET title = "Web Developer" WHERE id = ?`, 3, function (err, updatedRole) {
    if (err) return console.log(err);
    console.log("Employee role updated!");
    // DISPLAY QUERY OF UPDATED EMPLOYEE ROLE
    console.table(updatedRole);
    // RESTART APP
    startApp();
  })
}

// DELETE QUERY FROM DEPARTMENT
const deleteDept = () => {
  db.query(`
  DELETE FROM departments WHERE id = ?`, 1, function (err, deletedDept) {
    if (err) return console.log(err);
    console.log("Employee role updated!");
    // DISPLAY QUERY OF DELETED DEPARTMENT
    console.table(deletedDept);
    // RESTART APP
    startApp();
  })
}

// DELETE QUERY FROM ROLE
const deleteRole = () => {
  db.query(`
  DELETE FROM roles WHERE id = ?`, 2, function (err, deletedRole) {
    if (err) return console.log(err);
    console.log("Employee role updated!");
    // DISPLAY QUERY OF DELETED ROLE
    console.table(deletedRole);
    // RESTART APP
    startApp();
  })
}

// DELETE QUERY FROM EMPLOYEE
const deleteEmployee = () => {
  db.query(`
  DELETE FROM employees WHERE id = ?`, 5, function (err, deletedEmployee) {
    if (err) return console.log(err);
    console.log("Employee role updated!");
    // DISPLAY QUERY OF DELETED EMPLOYEE
    console.table(deletedEmployee);
    // RESTART APP
    startApp();
  })
}

// Run Application
startApp();