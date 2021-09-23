INSERT INTO department (`name`)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO role (`title`, `salary`, `department_id`)
VALUES ("Accountant", 95000, 2),
       ("Legal Team Lead", 105000, 3),
       ("Sr. Accountant", 115000, 2),
       ("Sales Manager", 120000, 4)
       ("Software Engineer", 110000, 1)
       ("Engineering Manager", 120000, 1)
       ("Salesperson", 100000, 4)
       ("Lawyer", 100000, 3);
       
INSERT INTO employee (`first_name`, `last_name`, `role_id`, `manager_id`)
VALUES ("Karli", "Johnson", 1, 1),
       ("Bart", "Lewis", 2, 0),
       ("Jeff", "Smith", 3, 3),
       ("Mary", "Ann", 4, 0),
       ("Jennifer", "Button", 1, 0),
       ("Harvey", "Brown", 2, 2)
       ("Sarah", "Allen", 4, 4),
       ("Mike", "Bennett", 3, 0);