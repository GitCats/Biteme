### -=-HEROKU-=-
-=-Interacting with online PostgreSQL db-=-
Enter this in your terminal to access the db directly:
heroku pg:psql --app heroku-postgres-bc93e872 HEROKU_POSTGRESQL_PUCE

### -=-POSTGRESQL COMMANDS-=-
* \dt => will show all tables in the db
* \q => will escape you from the db
* SELECT * from [TABLENAME}; => will display all of the columns and records for a table
* SELECT * from [TABLENAME} WHERE name='jimmy johns'; => will display all of the columns for records where the name column = 'jimmy johns'
* DELETE FROM [TABLENAME] WHERE name='jimmy johns'; => deletes all records from specified table based on whatever comes after 'where' statement
* UPDATE [TABLENAME] SET expiration=2200 WHERE id=1; => updates a record with id=1 in table [TABLENAME], setting the expiration column to 2200

### API Routes

GET /api/deals/getAll => Gets all deals from database that haven't expired.

                    response body: [ {deal}, {deal}, ... ]

POST /api/deals/update => Sets the expiration of a deal to the current date and time.

                    request body: {
                              	   deal_id: INTEGER,
                                   expiration: 'military time',
                                   day: new Date().getDate(),
                                   month: new Date().getMonth() + 1,
                                   year: new Date().getFullYear()
                              	  }

POST /api/deals/filterByProximity => Accepts user input as origin address and returns matrix of 
                                     routes to addresses of currently displayed deals (makes a built-in GET request to Google Maps Distance Matrix API).

                    request body: {
                                   startingPoint: 'origin address',
                                   destinations: 'addresses of displayed deals'
                                  }

POST /api/login/signup => When a user inputs an email, this will check against the database to see 
                          if it already exists; if it doesn't then it will create it and save the password associated with it (after hashing it) to the users database & then send back a 201 (created) response.

                    request body: {
                                   email: 'person@gmail.com',
                                   password: 'abc'
                                  }

POST /api/login/signin => Selects user email where matched in the database and then runs a 
                          function to hash and compare the submitted password against the stored password in database. If they match it sends a 200 response.

                    request body: {
                                   email: 'person@gmail.com',
                                   password: 'abc'
                                  }

POST /api/owner/login => Selects owner email where matched in the database and then runs a 
                         function to hash and compare the submitted password against the stored password in database. If they match it sends a 200 response.

                    request body: {
                                   email: 'person@gmail.com',
                                   password: 'abc'
                                  }

POST/api/owner/create => This will take user inputted information and use it to add a new deal to 
                         the database. Also, users that have this restaurant or its cuisine 'checked' under their preferences will receive a text message and/or email to be notified that this restaurant has made a new deal.

                    request body: { 
                                   restaurant_id: INTEGER, 
                                   description: 'deal description',
                                   expiration: 'expiry',
                                   month: 'month of expiration',
                                   day: 'day of expiration',
                                   year: 'year of expiration'
                                  }

GET /api/owner/getAllDeals/* => This gets all the deals from the database according to restaurant 
                                id.

                    response body: [ {deal}, {deal}, ... ]

POST /api/owner/updateProfile => Updates the restaurant owner's profile information. If any 
                                 particular property is not specified in the request body, it will be overwritten with a blank value in the database. Also, it returns all of the restaurant's info.

                    request body: {
                                   restaurant_id: INTEGER,
                                   name: 'restaurant name',
                                   image_name: 'restaurant image URL',
                                   address: 'complete address',
                                   cuisine_id: INTEGER,
                                   res_description: 'restaurant description',
                                   url: 'business website',
                                   phone_number: 'phone number'
                                  }

GET /api/owner/getProfile/* => Retrieves all previously entered restaurant profile information 
                               according to restaurant id.

                    response body: [ { profile info } ]

GET /api/userprefs/allRestaurants => Returns a list of all the restaurants currently in the 
                                     database. Includes the 'name', 'restaurant_id', 'image_name', and 'checked' (Boolean).

                    response body: [ {restaurant}, {restaurant}, ... ]

POST /api/userprefs/restaurants => Obtains stored restaurant preferences from database, called 
                                   upon success of /api/userprefs/allRestaurants GET request.

                    request body: {
                                   user_id: INTEGER
                                  }

                    response body: [ {restaurant}, {restaurant}, ... ]

POST /api/userprefs/cuisines => Obtains stored cuisine preferences from database.

                    request body: {
                                   user_id: INTEGER
                                  }

                    response body: [ {cuisine}, {cuisine}, ... ]

POST /api/userprefs/notifications => Obtains stored user preferences from the database.

                    request body: {
                                   user_id: INTEGER
                                  }

                    response body: [{
                                     email_notify: 'yes/no',
                                     phone_notify: 'yes/no'
                                    }]

POST /api/userprefs/updateRes => Updates user's preferred restaurants. A '1' value adds that 
                                 preference, '0' removes the preference.

                    request body: {
                                   'a': JSON.stringify({ 
                                                        user_id: INTEGER, 
                                                        restaurant_id: {
                                                                        restaurant_id: 1,
                                                                        restaurant_id: 0,
                                                                        ...
                                                                       }
                                                      })
                                  }

POST /api/userprefs/updateCuis => Updates user's cuisine preferences. In the cuisine_id object, 
                                  the key values represent cuisine_ids to update. A '1' value adds that preference, '0' removes the preference.

                    request body: {
                                   user_id: INTEGER,
                                   cuisine_id: {
                                                cuisine_id: 1,
                                                cuisine_id: 0,
                                                cuisine_id: 1
                                               }
                                  }

POST /api/userprefs/phone => Updates the user table to include any submitted phone number or 
                             change in preference in notification method.

                    request body: {
                                   'a': JSON.stringify({ 
                                                        user_id: INTEGER, 
                                                        phone: 'phone #', 
                                                        phonePref: 'yes/no', 
                                                        email: 'yes/no'
                                                      })
                                  }

