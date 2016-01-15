GET/api/getDeals => gets all deals from database

POST/api/getDeals => creates a deal from req.body and sends a 201

body: {
	restaurant_id: INTEGER,
  	description: varchar(5000),
  	expiration: INTEGER (ex: 1700, 24 hr time) 
	}
