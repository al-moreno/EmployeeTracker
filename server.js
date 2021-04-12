const inquirer = require('inquirer');
const mysql = require('mysql');



const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'your password',
    database: 'employeesDB',
});



const init = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add a department',
                'Add a role',
                'Update an employee role',
                'Quit',
            ],
        }
    ])
        .then((response) => {
            console.log(response);
            switch (response.prompt) {
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'Add a department':
                    addADepartment();
                    break;
                case 'Add a role':
                    addARole();
                    break;
                case 'Update an employee role':
                    updateAnEmployeeRole();
                    break;
                default:
                    connection.end();
            }
        })

};



const viewAllEmployees = () => {
    connection.query('SELECT * FROM employee', (err, result) => {
        if (err) throw err;
        console.log('viewAllEmployees');
        console.table(result);

        init();
    });

};

const viewAllDepartments = () => {
    connection.query('SELECT * FROM department', (err, result) => {
        if (err) throw err;
        console.log('viewAllDepartments');
        console.table(result);
        init();
    });


};

const viewAllRoles = () => {
    connection.query('SELECT * FROM role', (err, result) => {
        if (err) throw err;
        console.table(result);
        init();
    }
    );
};




const addADepartment = () => {
    inquirer.prompt([
        {
            name: 'department_name',
            type: 'input',
            message: 'Enter the department name:',
        }
    ])
        .then(({ department_name }) => {
            const query = connection.query('INSERT INTO department SET ?',
                { department_name }, (err, result) => {
                    if (err) throw err;
                    viewAllDepartments();
                    
                })
        })
};

const addARole = () => {
    inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the new role title:',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the new role salary:',
            },
            {
                name: 'department_id',
                type: 'input',
                message: 'Enter the new role department id:',
            }
        ])
        .then(({ title, salary, department_id }) => {
            const quary = connection.query('INSERT INTO role SET ?', 
            {title, salary, department_id}, (err, result) => {
                if (err) throw err;
                viewAllDepartments();
            })
        })

};

const updateAnEmployeeRole =  () => {
    inquirer
        .prompt([
            {
                name: "first_name",
                message: "First name of person to update role?",
                type: "input",
            },
            {
                name: "last_name",
                message: "Last name of person to update role?",
                type: "input",
            },
            {
                name: "update_role",
                message: "Which role to update?",
                type: "list",
                choices: [

                    'Legal Manager',
                    'Lawyer',
                    'Legal',
                    'Engineering Manager',
                    'Software Engineer',
                    'Engineer',
                    'Financial Manager',
                    'Financial Analyst',
                    'Analyst',
                    'Sales Manager',
                    'Sales Lead',
                    'Sales',
                ],
            },
        ])
        .then(({ first_name, last_name, role_id }) => {
            const quary = connection.query('INSERT INTO employee SET ?', 
            {first_name, last_name, role_id}, (err, result) => {
                if (err) throw err;
                viewAllDepartments();
            })
        })
        
};
connection.connect((err) => {
    if (err) throw err;
    init();
});