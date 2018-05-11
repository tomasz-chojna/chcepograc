CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  salt VARCHAR(255) NOT NULL
);

CREATE INDEX users_email_idx ON users (email);

CREATE TABLE IF NOT EXISTS event_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  max_participants INT NOT NULL,
  place VARCHAR(100) NOT NULL,
  skill_level VARCHAR(10) NULL,
  description TEXT NULL,
  owner INT NOT NULL,
  event_type INT NOT NULL
);

CREATE INDEX owner_fk_idx ON events (owner);
CREATE INDEX event_type_fk_idx ON events (event_type);

ALTER TABLE events ADD CONSTRAINT owner_fk
  FOREIGN KEY (owner)
  REFERENCES users (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE events ADD CONSTRAINT event_type_fk
  FOREIGN KEY (event_type)
  REFERENCES event_types (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS event_participants (
  id SERIAL PRIMARY KEY,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL
);


CREATE INDEX user_id_idx ON event_participants (user_id);
CREATE INDEX event_id_idx ON event_participants (event_id);

ALTER TABLE event_participants ADD CONSTRAINT user_id_fk
  FOREIGN KEY (user_id)
  REFERENCES users (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE event_participants ADD CONSTRAINT event_id_fk
  FOREIGN KEY (event_id)
  REFERENCES events (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

INSERT INTO users (id, first_name, last_name, phone, email, password, salt)
VALUES (DEFAULT, 'John', 'Doe', '123456789', 'john@doe.com', '123123', 'salt');

INSERT INTO event_types (id, name, image)
VALUES (DEFAULT, 'siatkowka', '');

INSERT INTO events (id, name, price, start_time, end_time, max_participants, place, skill_level, description, owner, event_type)
VALUES (DEFAULT, 'First event', '20.00', '1999-01-08 04:05:06', '1999-01-08 04:05:06', 10, 'stadion', 'basic', 'abcd...', 1, 1);

