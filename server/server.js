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
const { Pool } = pkg
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD
})

APP.use(cors())
APP.use(express.json())
APP.use(cookieParser())

const client_id = process.env.CLIENT_ID // your clientId
const client_secret = process.env.CLIENT_SECRET // Your secret
const redirect_uri = 'http://localhost:5000/callback' // Your redirect uri

const generateRandomString = (length) => {
  return crypto.randomBytes(60).toString('hex').slice(0, length)
}

const STATEKEY = 'spotify_auth_state'

APP.get('/login', function (req, res) {
  const state = generateRandomString(16)
  res.cookie(STATEKEY, state)

  // your application requests authorization
  const scope = 'user-read-private user-read-email'
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  )
})

APP.get('/callback', function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null
  const state = req.query.state || null
  const storedState = req.cookies ? req.cookies[STATEKEY] : null

  if (state === null || state !== storedState) {
    console.log(state, storedState)
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
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          new Buffer.from(client_id + ':' + client_secret).toString('base64')
      },
      json: true
    }

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token,
          refresh_token = body.refresh_token

        postCredentials(access_token, refresh_token)

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true
        }

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body)
        })

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          'http://localhost:5173/selection'
          // '/#' +
          //   querystring.stringify({
          //     access_token: access_token,
          //     refresh_token: refresh_token
          //   })
        )
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

async function postCredentials(accesstoken, refreshtoken) {
  const DATABASE = await pool.connect()
  DATABASE.release()

  try {
    await DATABASE.query(
      `INSERT INTO credentials (accesstoken, refreshtoken) VALUES ($1, $2) `,
      [accesstoken, refreshtoken]
    )
    console.log('Successfully posted credentials to the database.')
  } catch (error) {
    console.log(
      `Was not able to post credentials. The following error occurred: ${error}`
    )
  }
}

APP.get('/allsongs', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  try {
    await DATABASE.query('SELECT * FROM songs;').then((songs) => {
      console.log('Sending all songs to the client.')
      res.send(songs.rows)
    })
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
