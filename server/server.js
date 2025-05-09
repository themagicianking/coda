import express from 'express'
import cors from 'cors'
import pkg from 'pg'
import 'dotenv/config'
import crypto from 'crypto'
import querystring from 'querystring'
import cookieParser from 'cookie-parser'
import 'url-search-params-polyfill'

const PORT = process.env.PORT
const SERVER_URL = process.env.SERVER_URL
const CLIENT_URL = process.env.CLIENT_URL
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

const STATEKEY = 'spotify_auth_state'

const APP = express()

APP.use(cors())
APP.use(express.urlencoded({ extended: false }))
APP.use(express.json())
APP.use(cookieParser())

const { Pool } = pkg

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD
})

const generateRandomString = (length) => {
  return crypto.randomBytes(60).toString('hex').slice(0, length)
}

APP.get('/login', function (req, res) {
  const STATE = generateRandomString(16)
  res.cookie(STATEKEY, STATE)
  const SCOPE = 'playlist-modify-public'
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPE,
        redirect_uri: `${SERVER_URL}/callback`,
        state: STATE
      })
  )
})

APP.get('/callback', async (req, res) => {
  const CODE = req.query.code || null
  const STATE = req.query.state || null
  const STORED_STATE = req.cookies ? req.cookies[STATEKEY] : null
  const formData = new URLSearchParams()

  formData.append('code', CODE)
  formData.append('redirect_uri', `${SERVER_URL}/callback`)
  formData.append('grant_type', 'authorization_code')

  if (STATE === null || STATE !== STORED_STATE) {
    res.send(
      'Could not get authentication token. The following error occurred: state mismatch.'
    )
  } else {
    res.clearCookie(STATEKEY)
    try {
      await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        },
        body: formData.toString(),
        json: true
      })
        .then((response) => {
          if (response.status >= 400) {
            throw response.statusText
          }
          return response.json()
        })
        .then((json) => {
          res.redirect(
            `${CLIENT_URL}/selection?ACCESS_TOKEN=${json.access_token}&REFRESH_TOKEN=${json.refresh_token}`
          )
        })
    } catch (error) {
      res.send(
        `Could not get authentication token. The following error occurred: ${error}`
      )
    }
  }
})

APP.get('/me', async (req, res) => {
  const ACCESS_TOKEN = req.query.ACCESS_TOKEN

  try {
    await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + ACCESS_TOKEN },
      json: true
    })
      .then((response) => {
        if (response.status >= 400) {
          throw response.statusText
        }
        return response.json()
      })
      .then((json) => {
        console.log('Sending user profile to the client.')
        res.send(json)
      })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    res.status(500).send('Failed to fetch user profile.')
  }
})

APP.get('/search', async (req, res) => {
  const ACCESS_TOKEN = req.query.ACCESS_TOKEN
  if (!ACCESS_TOKEN) {
    res.status(401).send('No access token provided.')
    return
  }
  const INPUT = req.query.input
  try {
    await fetch(
      `https://api.spotify.com/v1/search?q=track%3A${INPUT}&type=track&include_external=audio`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + ACCESS_TOKEN },
        json: true
      }
    )
      .then((response) => {
        if (response.status >= 400) {
          throw response.statusText
        }
        return response.json()
      })
      .then((json) => {
        console.log('Sending search results to the client.')
        res.send(json)
      })
  } catch (error) {
    res.status(500).send(error)
  }
})

APP.get('/allsongs', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  try {
    await DATABASE.query('SELECT * FROM songs ORDER BY songorder;').then(
      (songs) => {
        console.log('Sending all songs to the client.')
        res.send(songs.rows)
      }
    )
  } catch (error) {
    res.status(500).send(error)
  }
})

APP.put('/note', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  const SONGORDER = req.body.songorder
  const NOTE = req.body.note
  try {
    await DATABASE.query(`UPDATE songs SET note=$1 WHERE songorder=$2;`, [
      NOTE,
      SONGORDER
    ]).then(() => {
      console.log(`Updated annotation for song with order of ${SONGORDER}`)
      res.send(201)
    })
  } catch (error) {
    res.status(501).send(error)
  }
})

APP.post('/refresh_token', async (req, res) => {
  const REFRESH_TOKEN = req.body.REFRESH_TOKEN

  const formData = new URLSearchParams()
  formData.append('grant_type', 'refresh_token')
  formData.append('refresh_token', REFRESH_TOKEN)

  try {
    await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
      },
      body: formData.toString()
    })
      .then((response) => {
        if (response.status >= 400) {
          throw response.statusText
        }
        return response.json()
      })
      .then((json) => {
        console.log('Sending new access token to the client.')
        res.send(json)
      })
  } catch (error) {
    console.error('Error refreshing token:', error)
    res.status(500).send('Failed to refresh token.')
  }
})

APP.post('/playlist', async (req, res) => {
  const ACCESS_TOKEN = req.body.ACCESS_TOKEN
  const USER_ID = req.body.USER_ID
  const PLAYLIST_NAME = 'Untitled Playlist'
  const DESCRIPTION = 'Created with the Coda app via Spotify API'

  try {
    await fetch(`https://api.spotify.com/v1/users/${USER_ID}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        name: PLAYLIST_NAME,
        description: DESCRIPTION || 'New playlist created via API',
        public: true
      })
        .then((response) => {
          if (response.status >= 400) {
            throw response.statusText
          }
          console.log('Playlist created successfully.')
          return response.json()
        })
        .then((json) => {
          console.log('Sending playlist details to the client.')
          res.send(json)
        })
    })
  } catch (error) {
    console.error('Error creating playlist:', error)
    res.status(500).send('Failed to create playlist.')
  }
})

APP.post('/song', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  const SONG = req.body
  try {
    await DATABASE.query(
      `INSERT INTO songs (spotifyid, artist, title, lyrics, note) VALUES($1,$2,$3,$4,$5)`,
      [SONG.spotifyid, SONG.artist, SONG.title, SONG.lyrics, SONG.note]
    ).then(() => {
      console.log(
        `Posted the following song to the database: ${JSON.stringify(SONG)}`
      )
      res.send(200)
    })
  } catch (error) {
    res.status(501).send(error)
  }
})

APP.delete('/song', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  const SONGORDER = req.body.songorder
  try {
    await DATABASE.query(`DELETE FROM songs WHERE songorder = $1`, [
      SONGORDER
    ]).then(() => {
      console.log(
        `Deleted song from the database where song order = ${SONGORDER}.`
      )
      res.send(200)
    })
  } catch (error) {
    res.status(501).send(error)
  }
})

APP.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
