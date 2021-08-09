CREATE TABLE users (
    id serial PRIMARY KEY,
    username text,
    email varchar(200),
    password varchar(1000),
    profile_pic text
);

CREATE TABLE favorites (
    id serial PRIMARY KEY,
    city text,
    state text,
    user_id int REFERENCES users(id)
);