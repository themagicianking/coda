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
  const [error, setError] = useState()
  const SERVER_URL = useContext(ServerContext)
  const PLAYLIST_ID = localStorage.getItem('PLAYLIST_ID')
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
          return res.json()
        })
        .then((json) => {
          setSongs(json)
        })
    } catch (error) {
      setError(
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
      {songs ? (
        <div className="playlist-box">
          <PlaylistDetails details={DETAILS} />
          <PlaylistSongList songs={songs} />
          <iframe
            style={{ borderRadius: '12px' }}
            src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      ) : (
        <p>{error}</p>
      )}

      <a>
        <button onClick={goHome}>Home</button>
      </a>
    </div>
  )
}
