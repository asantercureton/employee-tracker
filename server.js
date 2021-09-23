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

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})

app.use((req, res) => {
    res.status(404).end();
  });
  
// SELECT QUERIES FROM ROLE
// SELECT QUERIES FROM DEPARTMENT
// SELECT QUERIES FROM EMPLOYEE

// DELETE QUERIES FROM ROLE
// DELETE QUERIES FROM DEPARTMENT
// DELETE QUERIES FROM EMPLOYEE

// UPDATE QUERIES FROM ROLE
// UPDATE QUERIES FROM DEPARTMENT
// UPDATE QUERIES FROM EMPLOYEE