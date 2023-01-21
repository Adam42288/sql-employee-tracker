INSERT INTO department(dept_name)
VALUES
('Leadership'),
('Sales'),
('Warehouse'),
('HR'),
('QA'),
('Office Admin'),
('Accounting');

INSERT INTO role(title, salary, department_id)
VALUES
('Manager', 90000, 1),
('Sales Rep', 65000, 2),
('Warehouse Worker', 40000, 3),
('HR Rep', 70000, 4),
('Receptionist', 45000, 5),
('Accountant', 85000, 6);

INSERT INTO employee(first_name, last_name, role_id) VALUES
('Julian', 'Casablancas', 1),
('Daisy', 'Duke', 5),
('Alec', 'Baldwin', 2),
('David', 'Sigala', 4),
('Keller', 'Dover', 3),
('Anne', 'Sophie', 6);

-- Defaults to set Julian as manager for everyone initially -- 
UPDATE `employees_db`.`employee` SET `manager_id` = '1' WHERE (`id` > '1');