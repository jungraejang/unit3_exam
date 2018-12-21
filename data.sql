DROP DATABASE IF EXISTS api1_assignment;
CREATE DATABASE api1_assignment;

\c api1_assignment;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  age INT
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  poster_id INT REFERENCES users(id),
  body TEXT NOT NULL
);

CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  liker_id INT REFERENCES users(id),
  post_id INT REFERENCES posts(id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  commenter_id INT REFERENCES users(id),
  post_id INT REFERENCES posts(id),
  body TEXT NOT NULL
);

CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id)
);

CREATE TABLE pictures (
  id SERIAL PRIMARY KEY,
  album_id INT REFERENCES albums(id),
  url TEXT NOT NULL
);

INSERT INTO users(name, age) VALUES
('Jung Rae Jang', 28),
('Nataly Martinez', 26),
('James Bond', 40),
('Cpt Kirk', 50),
('Luke Skywalker', 29),
('Edgar Allan Poe', 210),
('Anakin Skywalker', 50)
