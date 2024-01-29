

CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
)



CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customer(id),
    room_id INTEGER REFERENCES rooms(id),
    checkin DATE NOT NULL,
    checkout DATE NOT NULL,
    room_price INTEGER
)

CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    room_type_id INTEGER REFERENCES room_types(id)
    sea_view BOOLEAN,
)

CREATE TABLE room_types(
    id SERIAL PRIMARY KEY,
    type_name VARCHAR(20),
    original_price INTEGER,
    current_price INTEGER,
    title VARCHAR(600),
    img VARCHAR(400)
)