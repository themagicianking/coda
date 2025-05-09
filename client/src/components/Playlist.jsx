import { useContext, useEffect, useState } from 'react'
import { ServerContext } from './ServerContext.jsx'
import { useNavigate } from 'react-router-dom'
import { PlaylistDetails } from './PlaylistDetails.jsx'
import { PlaylistSongList } from './PlaylistSongList.jsx'
import './playlist.css'

const DETAILS = {
  title: 'A Playlist',
  sender: 'Me',
  recipient: 'You',
  description: 'This is the personalized description of the whole playlist.'
}

export function Playlist() {
  const [songs, setSongs] = useState([])
  const SERVER_URL = useContext(ServerContext)
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/welcome')
  }

  async function getAllSongs() {
    try {
      await fetch(`${SERVER_URL}/allsongs`)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="playlist">
      <div className="playlist-box">
        <PlaylistDetails details={DETAILS} />
        <PlaylistSongList songs={songs} />
      </div>
      <a>
        <button onClick={goHome}>Home</button>
      </a>
    </div>
  )
}
