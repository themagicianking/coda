# Coda

![express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white) ![jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) ![node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![postgresql](https://img.shields.io/badge/PostgreSQL-green?style=for-the-badge) ![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![spotify](https://img.shields.io/badge/Spotify-1ED760?&style=for-the-badge&logo=spotify&logoColor=white)

This is a personalized playlist creation app for Techtonica's 2025h1 cohort final project.

*This project also utilizes Pico CSS and React Testing Library.*

## Installation

1. Clone the repository to your local machine.

## Usage

This project is not currently usable.

## Features

- A search bar...
  - ...that automatically populates with song results as the user types.
  - ...each song result will have a plus button which when clicked will add it to the user’s song list.
- A song list that displays the user’s selected songs...
  - ...each song will have a trash can button which will delete the song from the list.
  - ...each song will also be draggable, allowing the user to reorder the list.
- A portal which displays a song on the left and has a text box on the right in order to add annotations to that song...
  - ...song display will contain title, artist, and lyrics.
  - ...there should be a next and previous button to move from song to song.
- A form where the user can add a title, to, from, and description to their playlist.
- A review mode which displays...
  - ...title/to/from/description with an edit button.
  - ...each song with its annotation in order with an edit button on each annotation.
  - ...a button for reorder mode.
- An edit mode for title/to/from/description in which you can change all values
- An edit mode for each annotation
- A reorder mode in which you can drag and drop each song box
- A post-submission page...
  - ...with a sharing link to the created playlist
  - ...and a link back to the main page
- A playlist page for the recipient displaying...
  - ...each song and annotation
  - ...the added personalization
  - ...an imbedded music player
  - ...a small link to the main page

  ## Testing

  This project does not yet have any testing. Planned tests are as follows:

- Test every component for basic rendering
- Mock API call and test that data is rendered correctly, and that error message displays correctly if API responds with an error
- Test that forms submit correctly and do not allow submission without required fields
- Test that dragging and dropping songs reorders them correctly
