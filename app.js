const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
if (err) throw err;
console.log("Starting team manager...");
menu();
});

const menu = () => {
    inquirer.prompt({
        message: "Welcome to your team organizer app. Select an option below",
        name: 'menu',
        type: 'list',
        choices: [
            'View Departments',
            'View Jobs',
            'View Employees',
            'Add a Department',
            'Add a job',
            'Add an employee',
            'Update an employee job',
            'Exit',
        ],
    })
    .then(response => {
        switch (response.menu) {
            case 'View Departments':
                viewDepartment();
                break;
            case 'View Jobs':
                viewJobs();
                break;
            case 'View Employees':
                viewEmployees();
                break;
        }
    })
};

const viewDepartment = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        console.table(res);
        menu();
    });
};

const viewJobs = () => {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        console.table(res);
        menu();
    });
};

