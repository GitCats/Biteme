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

GET/api/deals/getAll => gets all deals from database that haven't expired

POST /api/deals/delete => delete deal from deals table. Sends a 200 and the message 'Deleted'
  body:{deal_id: INTEGER}

body: {
	restaurant_id: INTEGER,
  	description: varchar(5000),
  	expiration: varchar(4),
    month: INTEGER (ex: 10),
    day: INTEGER (ex: 23),
    year: INTEGER (2016)
	}

POST/api/login/signin => selects email where they match and then runs a function to encrypt and check password against encrypted password in database. if they match it sends a 200.

body: {
	"email": "person@gmail.com",
	"password": "abc"
	}

POST /api/login/signup => when a user inputs an email, this will check against the database to see if it already exists, if it doesn't then it will create it and save the password associated with it (after encrypting it) to the users database & then send back 201 (created) response

POST/api/owner/signup => when we input username and password for the restaurant owners it will hash the password and store in the database

POST /api/owner/updatePassword => this will update the restaurant table where the username matches with a new hashed password


POST /api/owner/login => this will take the inputed username and password and compare the username to the database if found, it will compare the passwords and if they match it will send a 200 response

POST/api/owner/create => this will take user inputed information and use it to add a new deal to the database

GET /api/owner/getalldeals/* => this gets all the info from the database according to restaurant id that is related to the specific restaurant

POST /api/userprefs/updateCuis => updates user's cuisine preferences
  body: {
    user_id: 1,
    cuisine_id: {3: 1, 6: 0, 9: 1}
  }
  In the cuisine_id object, the key values represent cuisine_id's to update. A '1' value means add that preference, '0' means remove the preference

GET /api/userprefs/allRestaurants => returns a list of all the restaurants currently in the db. Includes the 'name', 'restaurant_id', 'image_name' properties

POST /api/owner/updateProfile=> updates the restaurant owner's profile information. All of these fields must be specified: restaurant_id, name, cuisine_id, image_name, res_description, phone_number, url, address. If any particular property is not specified in the request body, it will be overwritten with a blank value in the db. Also, this POST request returns all of the restaurant's info

POST /api/userprefs/phone needs a request body that has the user_id and a phone in the following format “+14158675311” (a string)- it will update the user table to include the phone number where the user_id matches
