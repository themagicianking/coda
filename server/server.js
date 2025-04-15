import express from 'express'
import cors from 'cors'
import pkg from 'pg'
import 'dotenv/config'

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

APP.get('/allsongs', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  try {
    const SONGS = await DATABASE.query('SELECT * FROM songs;')
    console.log('Sending all songs to the client.')
    res.json(SONGS.rows)
  } catch (error) {
    res.status(404).send(error)
  }
})

APP.get('/song', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  const SONGORDER = req.query.songorder
  try {
    const SONG = await DATABASE.query(
      `SELECT * FROM songs WHERE songorder = ${SONGORDER}`
    )
    console.log(`Sending song with order of ${SONGORDER} to the client`)
    res.json(SONG.rows)
  } catch (error) {
    res.status(404).send(error)
  }
})

APP.get('/songexists', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  const SONGORDER = req.query.songorder
  try {
    const SONGS = await DATABASE.query(
      `SELECT EXISTS (SELECT 1 FROM songs WHERE songorder = ${SONGORDER}) AS "exists"`
    )
    console.log(
      `Sending existence status of song with songorder of ${SONGORDER} to client.`
    )
    res.json(SONGS.rows)
  } catch (error) {
    res.status(404).send(error)
  }
})

APP.put('/note', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  const SONGID = req.body.songid
  const NOTE = req.body.note
  try {
    await DATABASE.query(`UPDATE songs SET note=$1 WHERE songid=$2;`, [
      NOTE,
      SONGID
    ])
    console.log(`Updated annotation for song with id of ${SONGID}`)
    res.send(201)
  } catch (error) {
    res.status(500).send(error)
  }
})

APP.post('/addsongs', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  const SONGS = req.body
  try {
    await SONGS.forEach((song) => {
      DATABASE.query(
        `INSERT INTO songs (songid, spotifyid, songorder, artist, title, lyrics, note) VALUES($1,$2,$3,$4,$5,$6,$7)`,
        [
          song.songID,
          song.spotifyID,
          song.songorder,
          song.artist,
          song.title,
          song.lyrics,
          song.note
        ]
      )
    })
    res.send(200)
  } catch (error) {
    res.status(500).send(error)
  }
})

APP.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
