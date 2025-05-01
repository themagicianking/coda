import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SongCard } from './SongCard'
import './playlist.css'

const PERSONALIZATION = {
  title: 'A Playlist',
  sender: 'Me',
  recipient: 'You',
  description: 'This is the personalized description of the whole playlist.'
}

export function Playlist() {
  const [songs, setSongs] = useState([])

  async function getAllSongs() {
    try {
      await fetch('http://localhost:5000/allsongs')
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          console.log('Got all songs from the server.')
          return res.json()
        })
        .then((json) => {
          setSongs(json)
        })
    } catch (error) {
      throw new Error(
        `Could not get songs from server. The following error occurred: ${error}`
      )
    }
  }

  useEffect(() => {
    getAllSongs()
  }, [])

  return (
    <div className="playlist">
      <div className="card">
        <div className="title">
          <h1>{PERSONALIZATION.title}</h1>
          <h2>
            From {PERSONALIZATION.sender} to {PERSONALIZATION.recipient}
          </h2>
        </div>
        <p className='description'>{PERSONALIZATION.description}</p>
        <ol className='songs'>
          {songs.map((song) => (
            <SongCard key={song.songorder} song={song} />
          ))}
        </ol>
      </div>
      {/* This will link to the homepage component when it's created */}
      <Link to={{ pathname: '/welcome' }} role="link">
        Home
      </Link>
    </div>
  )
}
