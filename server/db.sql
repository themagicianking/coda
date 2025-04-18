DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  spotifyid VARCHAR(255) NOT NULL,
  songorder INTEGER NOT NULL,
  artist VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  lyrics VARCHAR(5000),
  note VARCHAR(5000) NOT NULL,
);

INSERT INTO
  songs (
    spotifyid,
    songorder,
    artist,
    title,
    note
  )
VALUES
  (0, 0, 'Indigo Girls', 'Closer to Fine', ''),
  (1, 2, 'CHVRCHES', 'Empty Threat', ''),
  (2, 1, 'Twenty One Pilots', 'Stressed Out', ''),
  (16, 4, 'AJR', 'Bang', ''),
  (16, 3, 'cavetown', 'This is Home', '');