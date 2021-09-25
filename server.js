const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
require('inquirer');

const PORT = process.env.PORT || 3001;

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
const startApp = () => {
  inquirer
    .prompt({
      name: "startApp",
      message: "What would you like to do?",
      type: "rawlist",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
        "exit app",
      ]
    }).then((selected) => {
      switch (selected.startApp) {
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

        case "exit app":
          process.exit();
          break;
      };
      return;
    });
};

// VIEW ALL DEPARTMENTS
const viewAllDepts = () => {
  db.query(`
  SELECT * FROM department`, function (err, depts) {
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
  SELECT * FROM role`, function (err, roles) {
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
  SELECT * FROM employee`, function (err, employees) {
    if (err) return console.log(err);
    // DISPLAY QUERY OF EMPLOYEES
    console.table(employees);
    // RESTART APP
    startApp();
  });
}

// ADD A DEPARTMENT
const addDept = () => {
  inquirer
    .prompt({
      name: "department",
      message: "Provide the department name you want to add.",
      type: "input",
    }).then((newDept) => {
      db.query(`
      INSERT INTO department (name) VALUES (?)`, [newDept.department],
        function (err) {
          if (err) return console.log(err);
          console.log(`New department ${newDept.department} added!`);
          // DISPLAY QUERY OF NEW DEPARTMENT
          console.table(newDept);
          // RESTART APP
          startApp();
        });
    });
}

// ADD A ROLE
const addRole = () => {
  db.query(`
  SELECT * FROM department`, function (err, depts) {
    if (err) return console.log(err);
    inquirer
      .prompt([
        {
          name: "title",
          message: "Provide the title for this role.",
          type: "input",
        },
        {
          name: "salary",
          message: "Provide the salary for this role.",
          type: "input",
        },
        {
          name: "department",
          message: "Provide the department for this role.",
          type: "list",
          choices: depts.map(department =>
          ({
            name: department.name,
            value: department.id
          })
          )
        },
      ]).then((newRole) => {
        db.query(`
        INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [newRole.title, newRole.salary, newRole.department],
          function (err) {
            if (err) return console.log(err);
            console.log(`New role ${newRole.title} added!`);
            // DISPLAY QUERY OF NEW ROLE
            console.table(newRole);
            // RESTART APP
            startApp();
          })
      });
  });
}

// ADD AN EMPLOYEE
const addEmployee = () => {
  // PULLING IN DATA FOR ROLE
  db.query(`
  SELECT
  id AS value,
  title AS name
  FROM role`, (err, roles) => {
    db.query(`
    SELECT 
    id AS value,
    CONCAT(first_name, " ", last_name) AS name 
    FROM employee;`, (err, managers) => {
      if (err) console.log(err);
      console.log(roles);
      console.log(managers);

      inquirer
        .prompt([
          {
            name: "first_name",
            message: "Provide the first name for this employee.",
            type: "input",
          },
          {
            name: "last_name",
            message: "Provide the last name for this employee.",
            type: "input",
          },
          {
            name: "role",
            message: "Provide the role for this employee.",
            type: "list",
            choices: roles
          },
          {
            name: "manager",
            message: "Provide the employee's manager.",
            type: "list",
            choices: managers
          }
        ]).then((newEmployee) => {
          db.query(`
        INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [newEmployee.first_name, newEmployee.last_name, newEmployee.role, newEmployee.manager],
            function (err) {
              if (err) return console.log(err);
              // DISPLAY QUERY OF NEW ROLE
              console.table(newEmployee);
              // RESTART APP
              startApp();
            })
        });


    });
  })
};

// UPDATE AN EMPLOYEE ROLE
const updateRole = () => {
  inquirer
    .prompt([
      {
        name: "updated_id",
        message: "What is the employee's ID you want to update?",
        type: "input",
      },
      {
        name: "update_role",
        message: "What is the employee's new role ID?",
        type: "input",
      },
    ]).then((res) => {
      const updateEmploy = res.updated_id;
      const selectNewRole = res.update_role;
      db.query(`UPDATE employee SET role_id = "${selectNewRole}" WHERE id = ${updateEmploy}";`,
        function (err) {
          if (err) return console.log(err);
          console.log(`New employee ${res.role_id} added!`);
          // DISPLAY QUERY OF NEW ROLE
          console.table(res);
          // RESTART APP
          startApp();
        })
    });

};

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