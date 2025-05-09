# Coda

![express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white) ![jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) ![node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![postgresql](https://img.shields.io/badge/PostgreSQL-green?style=for-the-badge) ![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![spotify](https://img.shields.io/badge/Spotify-1ED760?&style=for-the-badge&logo=spotify&logoColor=white)

This is a personalized playlist creation app for Techtonica's 2025h1 cohort final project.

_This project also utilizes Skeleton CSS and React Testing Library._

## Installation

1. Clone the repository to your local machine.
2. Navigate into the client directory and rename the `.envexample` file to `.env`. Replace the value for `VITE_SERVER_URL` with `http://localhost:{your port here}`.
3. Navigate into the server directory and rename the `.envexample` file to `.env`. The values for this file are as follows:

   ```
    PORT=5000
    SERVER_URL="URL"
    CLIENT_URL="URL"
    CLIENT_ID="CLIENT_ID"
    CLIENT_SECRET="CLIENT_SECRET"
    PGUSER="user"
    PGHOST="localhost"
    PGDATABASE="coda"
    PGPASSWORD="password"
   ```

   If you are running the app locally, you will need to set up your database in postgresql first. In psql, run the command `CREATE DATABASE {your database name} WITH OWNER {your username}`. Then, run `psql -X {your database name} < db.sql`. This should create the database with a table to store song data.

4. Fill in `PGDATABASE` with your database name and `PGUSER` with your username.
5. Fill in `PGPASSWORD` with your computer's password.
6. Fill in `CLIENT_URL` with `http://localhost:{your client port}`.
7. For the rest of the credentials, you will need to register with [Spotify's developer API](https://developer.spotify.com). After registering, navigate to your dashboard and create a new app.

   When asked to give a redirect uri, input `http://localhost:{your server port}/callback`. In your `.env` file, input `http://localhost:{your server port}` for `SERVER_URL`.

   Fill in `CLIENT_ID` and `CLIENT_SECRET` with the data that's given on your dashboard after you create your app.

8. In the server directory, run `npm run start`.
9. Navigate into the client directory and run `npm run dev`. Open a new window and navigate to `http://localhost:{your client port}/welcome` (Vite usually defaults to `5173` for the port). The app should be on display!

## Usage

1. Click on the "get started" button on the welcome page. The first time you do this, Spotify will ask you to authorize the app to be able to read your account information. (These permissions will be changing slightly with new iterations of the app; eventually it will ask permission to edit and create public playlists.)
2. On the selection page, you will be able to search for songs through Spotify and add them to your selected songs. You may add the same song twice and you may also remove songs. You must select at least one song to move forward.
3. On the annotations page, each of the songs you selected will be displayed along with a text box. You can now add your notes to each song. Notes will automatically be saved when you click prev/next song and prev/next page.
4. On the playlist page, you may view all of the songs you have chosen with the notes you've given them. Clicking "home" will return you to the welcome page. Currently, your playlist data will persist when navigating home.

## Troubleshooting

- As of right now, the app does not automatically refresh the Spotify access token when it expires (it lasts for one hour). This can be fixed by simply clicking the "click here to get started" button on the welcome page.
- You or other people may receive a `check settings...is not valid JSON` error on the selection page if deploying the app publicly. This is because if your app is set to development mode in your Spotify developer dashboard, you must manually authorize users in the app's settings on your Spotify developer account in order for them to be able to use the app.

## Upcoming Features

- The ability to drag and drop songs on the selection page to reorder them.
- Lyrics display for each song on the annotation page.
- A personalization page where the user can add a title, to, from, and description to their playlist.
- A review mode which displays...
  - ...title/to/from/description with an edit button.
  - ...each song with its annotation in order with an edit button on each annotation.
  - ...a button for reorder mode.
- An edit mode for title/to/from/description in which you can change all values.
- An edit mode for each annotation.
- A reorder mode within the review page in which you can drag and drop each song.
- A post-submission page with a sharing link to the created playlist and a link back to the main page.
- An imbedded music player on the playlist page.

## Testing

### Current Tests

- The client renders the `AboutApp` component
- The client renders the `Annotation` component
- The client renders the `App` component
- The client renders the `Credits` component
- The client renders the `NoteInput` component with the correct values from the `song` prop
- The client renders the `Result` component with the correct values from the `song` prop
- The client renders the `Search` component
- The client renders the `SelectedSongList` component with the correct values from the `songs` prop
- The client renders the `Selection` component
- The client renders the `Song` component with the correct values from the `song` prop
- The client renders the `SongInfo` component with the correct values from the `song` prop
- The client renders the `Welcome` component

### Planned Tests

- Write mock API calls to test `getAllSongs()` and `putNote()` in the `Annotation` component.
- The client renders the main components in the `Annotation` component if `songs` is not null and `error` if it is
- The client renders the previous song button in the `Annotation` component if `orderNum` is > 0
- The client renders the next song button in the `Annotation` component if `orderNum + 2` is < `songs.length`
- The client renders the `Playlist` component
- Write mock API calls to test `getAllSongs()` in the `Playlist` component
- The client renders the `PlaylistDetails` componet with the correct values from the `details` prop
- The client renders the `PlaylistSongList` component with the correct values from the `songs` prop
- Write mock API calls to test `getResults()` in the `Search` component
- The client renders the ordered list of songs in the `Search` component if `results` is not null and `error` if it is
- The client renders the `SelectedSongList` component in the `Selection` component if `selected` is not null and `error` if it is
- Write mock API calls to test `getAllSongs()`, `postSong()`, `deleteSong()` in the `Selection` component
- The client renders the ordered list of songs in the `SongList` component if the `list` prop has a length > 0 and `<p>None yet!</p>` if not
- The client renders lyrics in the `SongInfo` component if lyrics are not null in the `song` prop and a message about no lyrics being found if they are null

- Write mock API calls to test all server endpoints
  - GET login
  - GET callback
  - GET search
  - GET allsongs
  - PUT note
  - POST song
  - DELETE song

## To Do

- [ ] Refactor back end to store/use as much data as possible in Spotify
- [ ] **Write function that automatically refreshes `accessToken` if it is expired**
- [x] Break components into smaller pieces where necessary
- [ ] Write all planned tests
- [ ] Add an imbedded music player to the playlist page
- [ ] Create a personalization page
- [ ] Create a review page
- [ ] Create a post submission page
- [ ] Display track art for each song
- [ ] Incorporate the [Genius API](https://docs.genius.com) to get lyrics for each song
- [ ] Create the ability to reorder songs on the selection page
- [ ] **Create user visible error messages for every failed API call clientside**
- [x] Refactor server to use one server url in `.env`
- [ ] Update CSS to convert cassette image into a cropped image with overlay rather than background image for a component
- [x] Update CSS so that button highlight disappears after click
- [x] Refactor `formatSong()` to support multiple artists
- [x] Refactor annotations page to render all songs at once and display one at a time
