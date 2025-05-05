CREATE SCHEMA `rms2022`;



#CREATE USER 'rt_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'my-strong-password';



#GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON RT_2020.* TO 'rt_user'@'localhost';



CREATE TABLE `rms2022`.`resource` (
  `employee_id` int,
  `peoplesoft_id` int,
  `role_id` int,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `mail_id` varchar(255),
  `created_timestamp` datetime DEFAULT (now()),
  `updated_timestamp` datetime DEFAULT (now()),
  `business_unit_id` int,
  PRIMARY KEY (`employee_id`, `peoplesoft_id`)
);



CREATE TABLE `rms2022`.`resource_role` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `code` varchar(4) UNIQUE, # SSE, ASE, TL
  `decsription` varchar(255)
);



CREATE TABLE `rms2022`.`project` (
  `project_id` varchar(45),
  `customer_id` int,
  `business_unit_id` int,
  `project_description` varchar(200),
  `status` ENUM ('ON_HOLD', 'ACTIVE', 'COMPLETED'),
  `start_date` datetime,
  `end_date` datetime,
  `project_name` varchar(45),
  PRIMARY KEY (`project_id`, `customer_id`)
);



CREATE TABLE `rms2022`.`employee_projects` (
  `employee_id` int,
  `project_id` varchar(45),
  `allocation_percentage` int COMMENT 'less than or equal to 100',
  PRIMARY KEY (`employee_id`, `project_id`)
);



CREATE TABLE `rms2022`.`employee_skills` (
  `employee_id` int,
  `skill_set` int,
  PRIMARY KEY (`employee_id`, `skill_set`)
);



CREATE TABLE `rms2022`.`project_skills` (
  `project_id` varchar(45),
  `skill_set` int,
  `required_number` int,
  PRIMARY KEY (`project_id`, `skill_set`)
);



CREATE TABLE `rms2022`.`customer` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `category` int,
  `description` varchar(255)
);



CREATE TABLE `rms2022`.`customer_category` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `code` varchar(10) UNIQUE, #BANKING, FINANCE
  `description` varchar(255)
);



CREATE TABLE `rms2022`.`business_unit` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `unit_code` varchar(4) UNIQUE, #TDC, CD
  `unit_description` varchar(255)
);



CREATE TABLE `rms2022`.`skill_set` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `code` varchar(15) UNIQUE, #JAVA, DEVOPS
  `description` varchar(255)
);



CREATE TABLE `rms2022`.`user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_name` varchar(255) UNIQUE,
  `password` varchar(255),
  `status` ENUM ('ACTIVE', 'IN-ACTIVE'),
  `login_status` tinyint(1),
  `created_timestamp` datetime DEFAULT (now())
);



ALTER TABLE `rms2022`.`employee_projects` ADD FOREIGN KEY (`employee_id`) REFERENCES `rms2022`.`resource` (`employee_id`);



ALTER TABLE `rms2022`.`employee_projects` ADD FOREIGN KEY (`project_id`) REFERENCES `rms2022`.`project` (`project_id`);



ALTER TABLE `rms2022`.`employee_skills` ADD FOREIGN KEY (`employee_id`) REFERENCES `rms2022`.`resource` (`employee_id`);



ALTER TABLE `rms2022`.`employee_skills` ADD FOREIGN KEY (`skill_set`) REFERENCES `rms2022`.`skill_set` (`id`);



ALTER TABLE `rms2022`.`project_skills` ADD FOREIGN KEY (`project_id`) REFERENCES `rms2022`.`project` (`project_id`);



ALTER TABLE `rms2022`.`project_skills` ADD FOREIGN KEY (`skill_set`) REFERENCES `rms2022`.`skill_set` (`id`);



ALTER TABLE `rms2022`.`resource` ADD FOREIGN KEY (`role_id`) REFERENCES `rms2022`.`resource_role` (`id`);



ALTER TABLE `rms2022`.`project` ADD FOREIGN KEY (`customer_id`) REFERENCES `rms2022`.`customer` (`id`);



ALTER TABLE `rms2022`.`project` ADD FOREIGN KEY (`business_unit_id`) REFERENCES `rms2022`.`business_unit` (`id`);



ALTER TABLE `rms2022`.`customer` ADD FOREIGN KEY (`category`) REFERENCES `rms2022`.`customer_category` (`id`);



;
