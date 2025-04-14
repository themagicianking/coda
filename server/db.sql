DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  songid VARCHAR(255) NOT NULL,
  spotifyid VARCHAR(255) NOT NULL,
  order INTEGER NOT NULL,
  artist VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  lyrics VARCHAR,
  note VARCHAR,
);

INSERT INTO
  songs (songid, spotifyid, order, artist, title)
VALUES
  (5, 0, 0, 'Indigo Girls', 'Closer to Fine'),
  (1, 1, 2, 'CHVRCHES', 'Empty Threat'),
  (4, 2, 1, 'Twenty One Pilots', 'Stressed Out'),
  (3, 16, 4, 'AJR', 'Bang'),
  (4, 16, 3, 'cavetown', 'This is Home');