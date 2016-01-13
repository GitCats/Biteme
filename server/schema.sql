-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'cuisines'
-- 
-- ---

DROP TABLE IF EXISTS cuisines;
		
CREATE TABLE cuisines (
  cusine_id SERIAL,
  cusine_type varchar(300),
  PRIMARY KEY (cusine_id)
);

-- ---
-- Table 'restaurants'
-- 
-- ---

DROP TABLE IF EXISTS restaurants;
		
CREATE TABLE restaurants (
  restaurant_id SERIAL,
  cusine_id INTEGER,
  image_name varchar(300),
  username varchar(30),
  password varchar(30),
  name varchar(100),
  description varchar(3000),
  PRIMARY KEY (restaurant_id)
);

-- ---
-- Table 'deals'
-- 
-- ---

DROP TABLE IF EXISTS deals;
		
CREATE TABLE deals (
  deal_id SERIAL,
  restaurant_id INTEGER,
  description varchar(5000),
  time_created DATETIME NOT NULL DEFAULT(GETDATE()),
  time_until_expir INTEGER,
  PRIMARY KEY (deal_id)
);

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS users;
		
CREATE TABLE users (
  user_id SERIAL,
  phone INTEGER,
  email varchar(50),
  username varchar(30),
  password varchar(30),
  PRIMARY KEY (user_id)
);

-- ---
-- Table 'restaurant_preferences'
-- 
-- ---

DROP TABLE IF EXISTS res_prefs;
		
CREATE TABLE res_prefs (
  id SERIAL,
  user_id INTEGER,
  restaurant_id INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Table 'cuisine_preferences'
-- 
-- ---

DROP TABLE IF EXISTS cuisine_prefs;
		
CREATE TABLE cuisine_prefs (
  id SERIAL,
  user_id INTEGER,
  cusine_id INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE restaurants ADD FOREIGN KEY (cusine_id) REFERENCES cuisines (cusine_id);
ALTER TABLE deals ADD FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id);
ALTER TABLE res_prefs ADD FOREIGN KEY (user_id) REFERENCES users (user_id);
ALTER TABLE res_prefs ADD FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id);
ALTER TABLE cuisine_prefs ADD FOREIGN KEY (user_id) REFERENCES users (user_id);
ALTER TABLE cuisine_prefs ADD FOREIGN KEY (cusine_id) REFERENCES cuisines (cusine_id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `cuisines` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `restaurants` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `deals` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `restaurant_preferences` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `cuisine_preferences` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

insert into cuisines (cuisine_id, cuisine_type) values (1, 'mexican');

insert into cuisines (cuisine_id, cuisine_type) values (2, 'fast food');

insert into cuisines (cuisine_id, cuisine_type) values (3, 'pizza');

insert into cuisines (cuisine_id, cuisine_type) values (4, 'sandwiches');

insert into cuisines (cuisine_id, cuisine_type) values (5, 'burgers');

insert into cuisines (cuisine_id, cuisine_type) values (6, 'american');

insert into cuisines (cuisine_id, cuisine_type) values (7, 'bbq');

insert into cuisines (cuisine_id, cuisine_type) values (8, 'breakfast');

insert into cuisines (cuisine_id, cuisine_type) values (9, 'chinese');

insert into cuisines (cuisine_id, cuisine_type) values (10, 'italian');

insert into cuisines (cuisine_id, cuisine_type) values (11, 'japanese');

insert into cuisines (cuisine_id, cuisine_type) values (12, 'vietnamese');

insert into cuisines (cuisine_id, cuisine_type) values (13, 'thai');

insert into cuisines (cuisine_id, cuisine_type) values (14, 'steakhouse');

insert into cuisines (cuisine_id, cuisine_type) values (15, 'indian');

insert into cuisines (cuisine_id, cuisine_type) values (16, 'other');


insert into restaurants (restaurant_id, cusine_id, image_name, username, password, name, description) values (1, 7, 'franklin.jpg', 'franklin', 'abc', 'Franklin Barbecue', 'World Famous Barbecue');


insert into deals (deal_id, restaurant_id, description, time_until_expir) values (1, 1, "50% off brisket", 5);


insert into users (user_id, phone, email, username, password) values (1, 5551234567, 'person@gmail.com', 'person', 'abc');

insert into res_prefs (id, user_id, restaurant_id) values (1, 1, 1);

insert into cuisine_prefs (id, user_id, cuisine_id) values (1, 1, 13);

-- INSERT INTO `cuisines` (`cusine_id`,`cusine_type`) VALUES
-- ('','');
-- INSERT INTO `restaurants` (`restaurant_id`,`cusine_id`,`image_name`,`restaurant_username`,`restaurant_password`,`restaurant_name`,`restaurant_desc`) VALUES
-- ('','','','','','','');
-- INSERT INTO `deals` (`deal_id`,`restaurant_id`,`data`,`time_created`,`time_until_expir`) VALUES
-- ('','','','','');
-- INSERT INTO `users` (`user_id`,`phone`,`email`,`username`,`user_password`) VALUES
-- ('','','','','');
-- INSERT INTO `restaurant_preferences` (`restaurantpref_id`,`user_id`,`restaurant_id`) VALUES
-- ('','','');
-- INSERT INTO `cuisine_preferences` (`cusinepref_id`,`user_id`,`cusine_id`) VALUES
-- ('','','');