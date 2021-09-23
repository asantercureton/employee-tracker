INSERT INTO department (`name`)
VALUES ("Engineering"),
       ("Accounting"),
       ("HR"),
       ("Operations");

INSERT INTO role (`title`, `salary`, `department_id`)
VALUES ("Manager", 90000, 1),
       ("Engineer", 75000, 2),
       ("HR", 80000, 3),
       ("Accountant", 75000, 4);
       
INSERT INTO employee (`first_name`, `last_name`, `role_id`, `manager_id`)
VALUES ("Karli", "Johnson", 1, 1),
       ("Bart", "Lewis", 2, 1),
       ("Jeff", "Smith", 3, 1),
       ("Mary", "Ann", 4, 1),;