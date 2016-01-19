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
CREATE SEQUENCE cuisine_id_seq;

CREATE TABLE cuisines (
  cuisine_id INTEGER NOT NULL default nextval('cuisine_id_seq'),
  cuisine_type varchar(300),
  PRIMARY KEY (cuisine_id)
);
ALTER SEQUENCE cuisine_id_seq owned by cuisines.cuisine_id;

-- ---
-- Table 'restaurants'
--
-- ---

DROP TABLE IF EXISTS restaurants;
CREATE SEQUENCE restaurant_id_seq;

CREATE TABLE restaurants (
  restaurant_id INTEGER NOT NULL default nextval('restaurant_id_seq'),
  cuisine_id INTEGER,
  image_name varchar(3000),
  username varchar(30),
  password varchar(30),
  name varchar(100),
  description varchar(3000),
  url varchar(3000),
  address varchar(1000),
  PRIMARY KEY (restaurant_id)
);
ALTER SEQUENCE restaurant_id_seq owned by restaurants.restaurant_id;

-- ---
-- Table 'deals'
--
-- ---

DROP TABLE IF EXISTS deals;
CREATE SEQUENCE deal_id_seq;

CREATE TABLE deals (
  deal_id INTEGER NOT NULL default nextval('deal_id_seq'),
  restaurant_id INTEGER,
  description varchar(5000),
  expiration INTEGER,
  month INTEGER,
  day INTEGER,
  year INTEGER,
  PRIMARY KEY (deal_id)
);
ALTER SEQUENCE deal_id_seq owned by deals.deal_id;

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS users;
CREATE SEQUENCE user_id_seq;

CREATE TABLE users (
  user_id INTEGER NOT NULL default nextval('user_id_seq'),
  phone varchar(20),
  email varchar(50),
  -- username varchar(30),
  password varchar(30),
  PRIMARY KEY (user_id)
);
ALTER SEQUENCE user_id_seq owned by users.user_id;
-- ---
-- Table 'restaurant_prefs'
--
-- ---

DROP TABLE IF EXISTS res_prefs;
CREATE SEQUENCE res_prefs_id_seq;

CREATE TABLE res_prefs (
  res_pref_id INTEGER NOT NULL default nextval('res_prefs_id_seq'),
  user_id INTEGER,
  restaurant_id INTEGER,
  PRIMARY KEY (res_pref_id)
);
ALTER SEQUENCE res_prefs_id_seq owned by res_prefs.res_pref_id;
-- ---
-- Table 'cuisine_prefs'
--
-- ---

DROP TABLE IF EXISTS cuisine_prefs;
CREATE SEQUENCE cuisine_pref_seq;

CREATE TABLE cuisine_prefs (
  cuisine_pref_id INTEGER NOT NULL default nextval('cuisine_pref_seq'),
  user_id INTEGER,
  cuisine_id INTEGER,
  PRIMARY KEY (cuisine_pref_id)
);
ALTER SEQUENCE cuisine_pref_seq owned by cuisine_prefs.cuisine_pref_id;
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

insert into cuisines (cuisine_type) values ('mexican');

insert into cuisines (cuisine_type) values ('fast food');

insert into cuisines (cuisine_type) values ('pizza');

insert into cuisines (cuisine_type) values ('sandwiches');

insert into cuisines (cuisine_type) values ('burgers');

insert into cuisines (cuisine_type) values ('american');

insert into cuisines (cuisine_type) values ('bbq');

insert into cuisines (cuisine_type) values ('diner');

insert into cuisines (cuisine_type) values ('chinese');

insert into cuisines (cuisine_type) values ('italian');

insert into cuisines (cuisine_type) values ('japanese');

insert into cuisines (cuisine_type) values ('vietnamese');

insert into cuisines (cuisine_type) values ('thai');

insert into cuisines (cuisine_type) values ('steakhouse');

insert into cuisines (cuisine_type) values ('indian');

insert into cuisines (cuisine_type) values ('other');


insert into restaurants (cuisine_id, image_name, username, password, name, description, url) values (1, 'http://nrn.com/site-files/nrn.com/files/imagecache/medium_img/uploads/2015/03/chuyslogopromojpgcropdisplay.jpg', 'chuys', 'abc', 'Chuys Tex-Mex', 'Tex Mex institution', 'www.chuys.com');
insert into restaurants (cuisine_id, image_name, username, password, name, description, url) values (7, 'http://sheehancan.com/bbq/wp-content/uploads/2015/05/421929_324378574277288_656785892_n.jpg', 'franklin', 'abc', 'Franklin Barbecue', 'World Famous Barbecue', 'www.franklinbarbecue.com');
insert into restaurants (cuisine_id, image_name, username, password, name, description, url) values (5, 'http://static1.squarespace.com/static/5015a3ffe4b006ef411b533c/t/5302ce98e4b0484cf7575f99/1352923095057/hopdoddy_colorSM.jpg?format=500w', 'hopdoddy', 'abc', 'Hopdoddy', 'Gourmet burger spot', 'www.hopdoddy.com');
insert into restaurants (cuisine_id, image_name, username, password, name, description, url) values (8, 'http://www.hollyanissa.com/wp-content/uploads/2012/02/1-24Diner1.jpg', 'twentyfourdiner', 'abc', '24 Diner', 'Diner open 24 hours', 'www.24diner.com');

insert into deals (restaurant_id, description) values (2, '50% off brisket');
insert into deals (restaurant_id, description) values (3, '30% off your entire check');
insert into deals (restaurant_id, description) values (1, 'Free Queso with any purchase');
insert into deals (restaurant_id, description) values (4, '50% off omelettes');

insert into users (phone, email, password) values (5551234567, 'person@gmail.com', 'abc');
insert into users (phone, email, password) values (5122143432, 'kaylamatteo@gmail.com', 'abc');
insert into users (phone, email, password) values (5551234568, 'johnsmith@gmail.com', 'abc');
insert into users (phone, email, password) values (5551234569, 'janedoe@gmail.com', 'abc');

insert into res_prefs (user_id, restaurant_id) values (1, 1);
insert into res_prefs (user_id, restaurant_id) values (1, 2);
insert into res_prefs (user_id, restaurant_id) values (1, 3);
insert into res_prefs (user_id, restaurant_id) values (4, 1);

insert into cuisine_prefs (user_id, cuisine_id) values (2, 13);
insert into cuisine_prefs (user_id, cuisine_id) values (4, 7);
insert into cuisine_prefs (user_id, cuisine_id) values (4, 6);
insert into cuisine_prefs (user_id, cuisine_id) values (3, 1);

