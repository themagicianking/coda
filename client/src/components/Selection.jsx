import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ServerContext } from './ServerContext.jsx'
import { Search } from './Search.jsx'
import { SelectedSongList } from './SelectedSongList.jsx'
import { setItemWithExpiration } from '../utils/localStorage.js'
import { fetchWithOAuth } from '../utils/fetchWithOAuth.js'
import './selection.css'

export function Selection() {
  const SERVER_URL = useContext(ServerContext)
  const [selected, setSelected] = useState()
  const [error, setError] = useState()
  const navigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search)

  useEffect(() => {
    getAllSongs()
    setItemWithExpiration('ACCESS_TOKEN', urlParams.get('ACCESS_TOKEN'), 60)
    localStorage.setItem('REFRESH_TOKEN', urlParams.get('REFRESH_TOKEN'))
    if (localStorage.getItem('PLAYLIST_ID') === null) {
      fetchWithOAuth(postPlaylist, SERVER_URL)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {}, [selected])

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
          setSelected(json)
        })
    } catch (e) {
      setError(
        `Could not get songs from server. The following error occurred: ${e}`
      )
    }
  }

  async function postPlaylist(accessToken) {
    try {
      await fetch(`${SERVER_URL}/playlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ACCESS_TOKEN: accessToken })
      })
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          console.log(
            `Playlist posted successfully, server sent response ${res.status}`
          )
          return res.json()
        })
        .then((json) => {
          localStorage.setItem('PLAYLIST_ID', json.id)
          console.log(`Successfully created playlist with ID: ${json.id}`)
        })
    } catch (e) {
      setError(
        `Could not add playlist to server. The following error occurred: ${e}`
      )
    }
  }

  async function postSong(song) {
    try {
      fetch(`${SERVER_URL}/song`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song)
      })
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          console.log(
            `Song posted successfully, server sent response ${res.status}`
          )
        })
        .then(() => {
          getAllSongs()
        })
    } catch (e) {
      setError(
        `Could not add song to server. The following error occurred: ${e}`
      )
    }
  }

  async function deleteSong(songorder) {
    try {
      fetch(`${SERVER_URL}/song`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songorder: songorder })
      })
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          console.log(
            `Song deleted successfully, server sent response ${res.status}`
          )
        })
        .then(() => {
          getAllSongs()
        })
    } catch (e) {
      setError(
        `Could not delete song from database. The following error occurred: ${e}`
      )
    }
  }

  const addSong = (song) => {
    postSong(song)
  }

  const removeSong = (songorder) => {
    deleteSong(songorder)
  }

  const goToPrevPage = () => {
    navigate('/welcome')
  }

  const goToNextPage = () => {
    navigate('/annotations')
  }

  return (
    <div className="selection">
      <h1 className="title">Choose Your Songs</h1>
      <div className="lists">
        <Search handleSelect={addSong} />
        {selected ? (
          <SelectedSongList songs={selected} handleRemove={removeSong} />
        ) : (
          <p>{error}</p>
        )}
      </div>
      <div className="nav">
        <a>
          <button onClick={goToPrevPage}>Previous</button>
        </a>
        <a>
          <button onClick={goToNextPage}>Next</button>
        </a>
      </div>
    </div>
  )
}
