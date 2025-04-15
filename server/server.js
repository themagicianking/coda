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
  const SONGS = await DATABASE.query('SELECT * FROM songs;')
  res.json(SONGS.rows)
})

APP.get('/song', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  const SONGORDER = req.query.songorder
  const SONG = await DATABASE.query(
    `SELECT * FROM songs WHERE songorder = ${SONGORDER}`
  )
  res.json(SONG.rows)
})

APP.get('/songexists', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  const SONGORDER = req.query.songorder
  const SONGS = await DATABASE.query(
    `SELECT EXISTS (SELECT 1 FROM songs WHERE songorder = ${SONGORDER}) AS "exists"`
  )
  res.json(SONGS.rows)
})

APP.put('/note', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  const SONGID = req.body.songid
  const NOTE = req.body.note
  await DATABASE.query(`UPDATE songs SET note=$1 WHERE songid=$2;`, [
    NOTE,
    SONGID
  ])
  res.send(200)
})

APP.post('/addsongs', async (req, res) => {
  const DATABASE = await pool.connect()
  DATABASE.release()
  const SONGS = req.body.songs
  await SONGS.forEach((song) => {
    console.log(song)
    DATABASE.query(
      `INSERT INTO songs (songid, spotifyid, songorder, artist, title, lyrics, note) VALUES($1,$2,$3,$4,$5,$6,$7)`,
      [
        song.songid,
        song.spotifyid,
        song.songorder,
        song.artist,
        song.title,
        song.lyrics,
        song.note
      ]
    )
  })
  res.send(200)
})

APP.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
