-=-Interacting with online Postgresql db-=-
Ensure that the heroku cli toolbelt is installed on your computer 
https://toolbelt.heroku.com/

heroku pg:psql --app heroku-postgres-bc93e872 HEROKU_POSTGRESQL_PUCE

GET/api/getDeals => gets all deals from database

POST/api/getDeals => creates a deal from req.body and sends a 201

body: {
	restaurant_id: INTEGER,
  	description: varchar(5000),
  	expiration: INTEGER (ex: 1700, 24 hr time) 
	}

POST/api/login/signin => selects email where they match and then runs a function to check password against database. if they match it sends a 201.

body: {
	"email": "person@gmail.com", 
	"password": "abc"
	}

POST/api/login/signup => when a user inputs an email, this will check against the database to see if it already exists, if it doesn't then it will create it and save the password associated with it to the users database & then send back 201 (created) response