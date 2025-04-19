import { useEffect, useState } from 'react'
import { SongCard } from './SongCard'

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
    <div>
      <h1>{PERSONALIZATION.title}</h1>
      <h2>
        From {PERSONALIZATION.sender} to {PERSONALIZATION.recipient}
      </h2>
      <p>{PERSONALIZATION.description}</p>
      <ol>
        {songs.map((song) => (
          <SongCard key={song.songorder} song={song} />
        ))}
      </ol>
    </div>
  )
}
