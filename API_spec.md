-=-HEROKU-=-
-=-Interacting with online Postgresql db-=-
Enter this in your terminal to access the db directly:
heroku pg:psql --app heroku-postgres-bc93e872 HEROKU_POSTGRESQL_PUCE

-=-POSTGRESQL COMMANDS-=-
==>\dt - will show all tables in the db
==>\q - will escape you from the db
==>SELECT * from [TABLENAME}; - will display all of the columns and records for a table
==>SELECT * from [TABLENAME} WHERE name='jimmy johns'; - will display all of the columns for records where the name column = 'jimmy johns'
==>DELETE FROM [TABLENAME] WHERE name='jimmy johns'; - deletes all records from specified table based on whatever comes after 'where' statement
==>UPDATE [TABLENAME] SET expiration=2200 WHERE id=1; - updates a record with id=1 in table [TABLENAME], setting the expiration column to 2200

GET/api/getDeals => gets all deals from database that haven't expired

POST/api/getDeals => creates a deal from req.body and sends a 201

body: {
	restaurant_id: INTEGER,
  	description: varchar(5000),
  	expiration: INTEGER (ex: 1700, 24 hr time. No :),
    month: INTEGER (ex: 10),
    day: INTEGER (ex: 23),
    year: INTEGER (2016)
	}

POST/api/login => selects username where they match and then runs a function to check password against database. if they match it sends a 201.

body: {
	"username": "person person",
	"password": "abc"
	}


When creating deal, 'date' column will have to be in format '1162016' for jan 16, 2016
