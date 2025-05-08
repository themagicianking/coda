import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ServerContext } from './ServerContext'
import { SongCard } from './SongCard'
import './playlist.css'

function getCookie(cname) {
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export function Playlist() {
  const [songs, setSongs] = useState([])
  const [personalization, setPersonalization] = useState({})
  const PLAYLIST_ID = getCookie('PLAYLIST_ID')
  const SERVER_URL = useContext(ServerContext)
  const navigate = useNavigate()

  const goHome = () => {
    clearCookies()
    navigate('/welcome')
  }

  async function getAllSongs() {
    try {
      await fetch(`${SERVER_URL}/allsongs?PLAYLIST_ID=${PLAYLIST_ID}`)
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

  async function getPersonalization() {
    try {
      await fetch(`${SERVER_URL}/personalization?playlistid=${PLAYLIST_ID}`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          console.log('Got playlist personalization detials from server.')
          return res.json()
        })
        .then((json) => {
          setPersonalization(json)
        })
    } catch (error) {
      console.log(
        `Could not get personalization details. The following error occurred: ${error}`
      )
    }
  }

  function clearCookies() {
    let date = new Date()
    date.setTime(date.getTime() - 1)
    document.cookie = 'PLAYLIST_ID=; expires=' + date.toGMTString()
    document.cookie = 'ACCESS_TOKEN=; expires=' + date.toGMTString()
  }

  useEffect(() => {
    getAllSongs()
    getPersonalization()
  }, [])

  return (
    <div className="playlist">
      <div className="card">
        <div className="title">
          <h1>{personalization.title}</h1>
          <h2>
            From {personalization.sender} to {personalization.recipient}
          </h2>
        </div>
        <p className="description">{personalization.description}</p>
        <ol className="songs">
          {songs.map((song) => (
            <SongCard key={song.songorder} song={song} />
          ))}
        </ol>
        <iframe
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/playlist/7jM1o2G0XMPV5iLMvLS6c5?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
      <a>
        <button onClick={goHome}>Home</button>
      </a>
    </div>
  )
}
