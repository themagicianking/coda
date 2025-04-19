import { useEffect, useState } from 'react'
import { SongCard } from './SongCard'

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
      <h1>Playlist Name</h1>
      <h2>From Name to Name</h2>
      <p>General description of playlist</p>
      <ol>
        {songs.map((song) => (
          <SongCard key={song.songorder} song={song} />
        ))}
      </ol>
    </div>
  )
}
