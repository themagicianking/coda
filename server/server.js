import express from 'express'
import cors from 'cors'
import pkg from 'pg'
import 'dotenv/config'
import crypto from 'crypto'
import querystring from 'querystring'
import cookieParser from 'cookie-parser'
import request from 'request'

const APP = express()
const PORT = 5000
const ENVIRONMENT = process.env.RAILWAY_ENVIRONMENT_NAME
const { Pool } = pkg

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD
})

APP.use(cors())
APP.use(express.json())
APP.use(cookieParser())

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const SELECTION_URI = process.env.SELECTION_URI

const generateRandomString = (length) => {
  return crypto.randomBytes(60).toString('hex').slice(0, length)
}

const STATEKEY = 'spotify_auth_state'

APP.get('/login', function (req, res) {
  const STATE = generateRandomString(16)
  res.cookie(STATEKEY, STATE)
  // request authorization from spotify api
  const SCOPE = 'user-read-private playlist-modify-public'
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPE,
        redirect_uri: REDIRECT_URI,
        state: STATE
      })
  )
})

APP.get('/callback', function (req, res) {
  // request refresh and access tokens after checking the state parameter

  const CODE = req.query.code || null
  const STATE = req.query.state || null
  const STORED_STATE = req.cookies ? req.cookies[STATEKEY] : null
  const ACCESS_TOKEN = req.cookies ? req.cookies.ACCESS_TOKEN : null

  if (STATE === null || STATE !== STORED_STATE) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch'
        })
    )
  } else {
    res.clearCookie(STATEKEY)
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: CODE,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
      },
      json: true
    }

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token
        res.clearCookie('ACCESS_TOKEN')
        res.cookie('ACCESS_TOKEN', access_token)

        let options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + ACCESS_TOKEN },
          json: true
        }

        // todo: write function that uses refresh token to get new auth code
        // when old auth code has expired
        // refreshToken = body.refresh_token

        // redirects the user to song selection page
        res.redirect(SELECTION_URI)
      } else {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token'
            })
        )
      }
    })
  }
})

APP.get('/userid', async (req, res) => {
  const ACCESS_TOKEN = req.query.ACCESS_TOKEN
  const options = {
    url: 'https://api.spotify.com/v1/me',
    headers: {
      Authorization: 'Bearer ' + ACCESS_TOKEN
    },
    json: true
  }
  try {
    request.get(options, function (error, response, body) {
      res.send(body)
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

APP.get('/search', async (req, res) => {
  const INPUT = req.query.input
  const ACCESS_TOKEN = req.query.ACCESS_TOKEN
  const options = {
    url: `https://api.spotify.com/v1/search?q=track%3A${INPUT}&type=track&include_external=audio`,
    headers: {
      Authorization: 'Bearer ' + ACCESS_TOKEN
    },
    json: true
  }
  try {
    request.get(options, function (error, response, body) {
      res.send(body)
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

APP.get('/prevsong', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  const SONGORDER = req.query.songorder
  try {
    await DATABASE.query(
      `SELECT * FROM songs WHERE songorder < ${SONGORDER} ORDER BY songorder DESC LIMIT 1`
    ).then((song) => {
      console.log(
        `Sending song previous in the order from ${SONGORDER} to the client`
      )
      res.json(song.rows[0])
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

APP.get('/prevsongexists', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  const SONGORDER = req.query.songorder
  try {
    await DATABASE.query(
      `SELECT EXISTS (SELECT 1 FROM songs WHERE songorder <= ${SONGORDER}) AS "exists"`
    ).then((songs) => {
      console.log(
        `Sending existence status of song with songorder less than or equal to ${SONGORDER} to client.`
      )
      res.send(songs.rows[0])
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

APP.get('/nextsong', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  const SONGORDER = req.query.songorder
  try {
    await DATABASE.query(
      `SELECT * FROM songs WHERE songorder > ${SONGORDER} ORDER BY songorder LIMIT 1`
    ).then((song) => {
      console.log(
        `Sending song next in the order from ${SONGORDER} to the client`
      )
      res.json(song.rows[0])
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

APP.get('/nextsongexists', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  const SONGORDER = req.query.songorder
  try {
    await DATABASE.query(
      `SELECT EXISTS (SELECT 1 FROM songs WHERE songorder >= ${SONGORDER}) AS "exists"`
    ).then((songs) => {
      console.log(
        `Sending existence status of song with songorder more than or equal to ${SONGORDER} to client.`
      )
      res.send(songs.rows[0])
    })
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

APP.post('/spotifyplaylist', async (req, res) => {
  const USERID = req.body.userid
  const ACCESS_TOKEN = req.body.ACCESS_TOKEN

  try {
    await fetch(`https://api.spotify.com/v1/users/${USERID}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      body: {
        name: 'Playlist Test Name',
        public: true,
        collaborative: false,
        description: 'Playlist test description'
      }
    }).then((res) => {
      console.log(res)
      if (res.status >= 400) {
        throw res.statusText
      }
      console.log('Successfully created new playlist.')
      res.send(200)
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

APP.post('/spotifysongs', async (req, res) => {
  const PLAYLISTID = req.playlistid
  const URIS = req.uris
  try {
    await fetch(`https://api.spotify.com/v1/playlists/${PLAYLISTID}/tracks`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      body: {
        uris: JSON.stringify(URIS),
        position: 0
      }
    }).then((res) => {
      console.log('Successfully added all songs to new playlist.')
      res.send(200)
    })
  } catch (error) {
    res.status(500).send(error)
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
