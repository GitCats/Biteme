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
  cuisine_id SERIAL,
  cuisine_type varchar(300),
  PRIMARY KEY (cuisine_id)
);

-- ---
-- Table 'restaurants'
--
-- ---

DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
  restaurant_id SERIAL,
  cuisine_id INTEGER,
  image_name varchar(300),
  username varchar(30),
  password varchar(30),
  name varchar(100),
  description varchar(3000),
  url varchar(50),
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
  expiration varchar(100),
  createdtime timestamp NOT NULL default now(),
  PRIMARY KEY (deal_id)
);

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL,
  phone varchar(20),
  email varchar(50),
  username varchar(30),
  password varchar(30),
  PRIMARY KEY (user_id)
);

-- ---
-- Table 'restaurant_prefs'
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
-- Table 'cuisine_prefs'
--
-- ---

DROP TABLE IF EXISTS cuisine_prefs;

CREATE TABLE cuisine_prefs (
  id SERIAL,
  user_id INTEGER,
  cuisine_id INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE restaurants ADD FOREIGN KEY (cuisine_id) REFERENCES cuisines (cuisine_id);
ALTER TABLE deals ADD FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id);
ALTER TABLE res_prefs ADD FOREIGN KEY (user_id) REFERENCES users (user_id);
ALTER TABLE res_prefs ADD FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id);
ALTER TABLE cuisine_prefs ADD FOREIGN KEY (user_id) REFERENCES users (user_id);
ALTER TABLE cuisine_prefs ADD FOREIGN KEY (cuisine_id) REFERENCES cuisines (cuisine_id);

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

insert into cuisines (cuisine_id, cuisine_type) values (8, 'diner');

insert into cuisines (cuisine_id, cuisine_type) values (9, 'chinese');

insert into cuisines (cuisine_id, cuisine_type) values (10, 'italian');

insert into cuisines (cuisine_id, cuisine_type) values (11, 'japanese');

insert into cuisines (cuisine_id, cuisine_type) values (12, 'vietnamese');

insert into cuisines (cuisine_id, cuisine_type) values (13, 'thai');

insert into cuisines (cuisine_id, cuisine_type) values (14, 'steakhouse');

insert into cuisines (cuisine_id, cuisine_type) values (15, 'indian');

insert into cuisines (cuisine_id, cuisine_type) values (16, 'other');


insert into restaurants (restaurant_id, cuisine_id, image_name, username, password, name, description, url) values (1, 1, 'http://nrn.com/site-files/nrn.com/files/imagecache/medium_img/uploads/2015/03/chuyslogopromojpgcropdisplay.jpg', 'chuys', 'abc', 'Chuys Tex-Mex', 'Tex Mex institution', 'www.chuys.com');
insert into restaurants (restaurant_id, cuisine_id, image_name, username, password, name, description, url) values (2, 7, 'http://sheehancan.com/bbq/wp-content/uploads/2015/05/421929_324378574277288_656785892_n.jpg', 'franklin', 'abc', 'Franklin Barbecue', 'World Famous Barbecue', 'www.franklinbarbecue.com');
insert into restaurants (restaurant_id, cuisine_id, image_name, username, password, name, description, url) values (3, 5, 'http://static1.squarespace.com/static/5015a3ffe4b006ef411b533c/t/5302ce98e4b0484cf7575f99/1352923095057/hopdoddy_colorSM.jpg?format=500w', 'hopdoddy', 'abc', 'Hopdoddy', 'Gourmet burger spot', 'www.hopdoddy.com');
insert into restaurants (restaurant_id, cuisine_id, image_name, username, password, name, description, url) values (4, 8, 'http://www.hollyanissa.com/wp-content/uploads/2012/02/1-24Diner1.jpg', 'twentyfourdiner', 'abc', '24 Diner', 'Diner open 24 hours', 'www.24diner.com');

insert into deals (deal_id, restaurant_id, description) values (1, 2, '50% off brisket');
insert into deals (deal_id, restaurant_id, description) values (2, 3, '30% off your entire check');
insert into deals (deal_id, restaurant_id, description) values (3, 1, 'Free Queso with any purchase');
insert into deals (deal_id, restaurant_id, description) values (4, 4, '50% off omelettes');

insert into users (user_id, phone, email, username, password) values (1, 5551234567, 'person@gmail.com', 'person person', 'abc');
insert into users (user_id, phone, email, username, password) values (2, 5122143432, 'kaylamatteo@gmail.com', 'Kayla M', 'abc');
insert into users (user_id, phone, email, username, password) values (3, 5551234568, 'johnsmith@gmail.com', 'John Smith', 'abc');
insert into users (user_id, phone, email, username, password) values (4, 5551234569, 'janedoe@gmail.com', 'Jane Doe', 'abc');

insert into res_prefs (id, user_id, restaurant_id) values (1, 1, 1);
insert into res_prefs (id, user_id, restaurant_id) values (2, 1, 2);
insert into res_prefs (id, user_id, restaurant_id) values (3, 1, 3);
insert into res_prefs (id, user_id, restaurant_id) values (4, 4, 1);

insert into cuisine_prefs (id, user_id, cuisine_id) values (1, 2, 13);
insert into cuisine_prefs (id, user_id, cuisine_id) values (2, 4, 7);
insert into cuisine_prefs (id, user_id, cuisine_id) values (3, 4, 6);
insert into cuisine_prefs (id, user_id, cuisine_id) values (4, 3, 1);

