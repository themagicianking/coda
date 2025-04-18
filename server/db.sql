DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
  songorder SERIAL PRIMARY KEY,
  spotifyid VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  lyrics VARCHAR(5000),
  note VARCHAR(5000) NOT NULL
);

INSERT INTO
  songs (
    spotifyid,
    artist,
    title,
    note
  )
VALUES
  (0, 'Indigo Girls', 'Closer to Fine', ''),
  (1, 'CHVRCHES', 'Empty Threat', ''),
  (2, 'Twenty One Pilots', 'Stressed Out', ''),
  (16, 'AJR', 'Bang', ''),
  (16, 'cavetown', 'This is Home', '');