# Coda

![express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white) ![jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) ![node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![postgresql](https://img.shields.io/badge/PostgreSQL-green?style=for-the-badge) ![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![spotify](https://img.shields.io/badge/Spotify-1ED760?&style=for-the-badge&logo=spotify&logoColor=white)

This is a personalized playlist creation app for Techtonica's 2025h1 cohort final project.

_This project also utilizes Skeleton CSS and React Testing Library._

## Installation

1. Clone the repository to your local machine.
2. Navigate into the client directory and rename the `.envexample` file to `.env`. Replace the value for `VITE_SERVER_URL` with `http://localhost:{your port here}`.
3. Navigate into the server directory and rename the `.envexample` file to `.env`. The values for this file are as follows:

   ```
   PGUSER="user"
   PGHOST="localhost"
   PGDATABASE="coda"
   PGPASSWORD="password"
   CLIENT_ID="client id"
   CLIENT_SECRET="client secret"
   RAILWAY_ENVIRONMENT_NAME="development"
   REDIRECT_URI="uri"
   USERID_URI="uri"
   SELECTION_URI="uri"
   ```

   If you are running the app locally, you will need to set up your database in postgresql first. In psql, run the command `CREATE DATABASE {your database name} WITH OWNER {your username}`. Then, run `psql -X {your database name} < db.sql`. This should create the database with a table to store song data.

4. Fill in `PGDATABASE` with your database name and `PGUSER` with your username.
5. Fill in `PGPASSWORD` with your computer's password.
6. For the rest of the credentials, you will need to register with [Spotify's developer API](https://developer.spotify.com). After registering, navigate to your dashboard and create a new app.

   When asked to give a redirect uri, input `http://localhost:{your server port}/callback`. In your `.env` file, input the same value for `REDIRECT_URI`.

   Fill in `CLIENT_ID` and `CLIENT_SECRET` with the data that's given on your dashboard after you create your app.

7. Fill in `USERID_URI`with `http://localhost:{your server port}/userid`.
8. Fill in `SELECTION_URI` with `http://localhost:{your client port}/selection`.
<!-- to do: refactor code so it uses server url and client url -->
9. In the server directory, run `npm run start`.
10. Navigate into the client directory and run `npm run dev`. Open a new window and navigate to `http://localhost:{your client port}/welcome` (Vite usually defaults to 5173 for the port). The app should be on display!

## Usage

1. Click on the "get started" button on the welcome page. The first time you do this, Spotify will ask you to authorize the app to be able to read your account information. (These permissions will be changing slightly with new iterations of the app; eventually it will ask permission to edit and create public playlists.)
2. On the selection page, you will be able to search for songs through Spotify and add them to your selected songs. You may add the same song twice and you may also remove songs. You must select at least one song to move forward.
3. On the annotations page, each of the songs you selected will be displayed along with a text box. You can now add your notes to each song. Notes will automatically be saved when you click prev/next song and prev/next page.
4. On the playlist page, you may view all of the songs you have chosen with the notes you've given them. Clicking "home" will return you to the welcome page. Currently, your playlist data will persist when navigating home.

## Troubleshooting

- As of right now, the app does not automatically refresh the Spotify access token when it expires (it lasts for one hour). This can be fixed by simply clicking the "click here to get started" button on the welcome page.
- You or other people may receive a ``check settings...is not valid JSON`` error on the selection page if deploying the app publicly. This is because if your app is set to development mode in your Spotify developer dashboard, you must manually authorize users in the app's settings on your Spotify developer account in order for them to be able to use the app.

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
