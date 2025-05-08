import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SongCard } from './SongCard'
import './playlist.css'

const PERSONALIZATION = {
  title: 'A Playlist',
  sender: 'Me',
  recipient: 'You',
  description: 'This is the personalized description of the whole playlist.'
}

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
  const PLAYLIST_ID = getCookie('PLAYLIST_ID')
  const navigate = useNavigate()

  const goHome = () => {
    clearCookies()
    navigate('/welcome')
  }

  async function getAllSongs() {
    try {
      await fetch(`http://localhost:5000/allsongs?PLAYLIST_ID=${PLAYLIST_ID}`)
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

  function clearCookies() {
    let date = new Date()
    date.setTime(date.getTime() - 1)
    document.cookie = 'PLAYLIST_ID=; expires=' + date.toGMTString()
    document.cookie = 'ACCESS_TOKEN=; expires=' + date.toGMTString()
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
        <p className="description">{PERSONALIZATION.description}</p>
        <ol className="songs">
          {songs.map((song) => (
            <SongCard key={song.songorder} song={song} />
          ))}
        </ol>
      </div>
      <a>
        <button onClick={goHome}>Home</button>
      </a>
    </div>
  )
}
