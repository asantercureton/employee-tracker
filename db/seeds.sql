INSERT INTO department (`name`)
VALUES ("Management"),
       ("Engineering"),
       ("Finance"),
       ("Sales");

INSERT INTO role (`title`, `salary`, `department_id`)
VALUES ("VP of Operations", 250000, 1),
       ("Director", 200000, 1),
       ("Sales Manager", 175000, 4),
       ("Application Engineer", 110000, 2),
       ("Accountant", 120000, 3),
       ("Salesperson", 140000, 4),
       ("Sr. Accountant", 100000, 3);
       
INSERT INTO employee (`first_name`, `last_name`, `role_id`, `manager_id`)
VALUES ("Karli", "Johnson", 1, null),
       ("Bart", "Lewis", 2, 1),
       ("Jeff", "Smith", 3, 2),
       ("Mary", "Ann", 4, 2),
       ("Jennifer", "Button", 5, 3),
       ("Harvey", "Brown", 6, 3),
       ("Sarah", "Allen", 7, 3);