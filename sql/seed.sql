INSERT INTO users
    (username, email, password, profile_pic)
VALUES
    ('test', 'password@fake.com', 'password', 'https://i.ytimg.com/vi/plKdvsODrzw/maxresdefault.jpg');

INSERT INTO favorites
    (city, state, user_id)
VALUES 
    ('atlanta', 'ga', 1),
    ('houston', 'tx', 1);