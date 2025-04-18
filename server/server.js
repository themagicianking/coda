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
