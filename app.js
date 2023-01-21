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
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Job':
                addJob();
                break;
            case 'Add an Employee':
                addEmployee();
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

const viewEmployees = () => {
    connection.query(
        'SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id FROM ((department JOIN role ON department.id = role.department_id) JOIN employee ON role_id = employee.role_id);', 
        function (err, res) {
        if (err) throw err;
        console.table(res);
        menu();
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'What is the name of the department?',
        },
    ])
    .then(answer => {
        connect.query(
            'INSERT INTO department (dept_name) VALUES (?)',
            [answer.department],
            function (err, res) {
                if (err) throw err;
                console.log('Department added');
                menu();
            }
        );
    });
};

const addJob = () => {
    inquirer.prompt([
        {
            name: 'jobTitle',
            type: 'input',
            message: 'What is the job title?',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary',
        },
        {
            name: 'deptId',
            type: 'input',
            message: 'Enter the department ID number',
        },
    ])
    .then(answer => {
        connect.query(
            'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
            [answer.jobTitle, answer.salary, answer.deptId],
            function (err, res) {
                if (err) throw err;
                console.log('Job added');
                menu();
            }
        );
    });
};
const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'nameFirst',
            type: 'input',
            message: 'Enter first name',
        },
        {
            name: 'nameLast',
            type: 'input',
            message: 'Enter last name',
        },
        {
            name: 'roleId',
            type: 'input',
            message: 'Enter the job ID number',
        },
        {
            name: 'managerId',
            type: 'input',
            message: 'Enter the manager ID number',
        },
    ])
    .then(answer => {
        connect.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [answer.nameFirst, answer.nameSecond, answer.roleId, answer.managerId],
            function (err, res) {
                if (err) throw err;
                console.log('Employee added');
                menu();
            }
        );
    });
};


