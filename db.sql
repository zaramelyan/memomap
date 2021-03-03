CREATE TABLE users (
  user_id SERIAL PRIMARY KEY, 
  first_name TEXT, 
  last_name TEXT, 
  username VARCHAR(10), 
  password VARCHAR(25)
  );

INSERT INTO TABLE users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4);


CREATE TABLE entries (
  entry_id SERIAL PRIMARY KEY,
  user_id INTEGER,
  location TEXT,
  lng DECIMAL,
  lat DECIMAL,
  travel_date DATE,
  entry_name TEXT,
  entry TEXT
);

INSERT INTO TABLE entries (user_id, location, lng, lat, travel_date, entry_name, entry) VALUES ($1, $2, $3, $4, $5, $6, $7);

SELECT * FROM entries WHERE user_id = $1;