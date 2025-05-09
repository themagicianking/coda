import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ServerContext } from './ServerContext.jsx'
import { Search } from './Search.jsx'
import { SelectedSongList } from './SelectedSongList.jsx'
import './selection.css'

function setItemWithExpiration(key, value, expirationInMinutes) {
  const now = new Date()
  const item = {
    value: value,
    expiration: now.getTime() + expirationInMinutes * 60 * 1000 // Convert minutes to milliseconds
  }
  localStorage.setItem(key, JSON.stringify(item))
}

export function Selection() {
  const SERVER_URL = useContext(ServerContext)
  const [selected, setSelected] = useState()
  const [error, setError] = useState()
  const navigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search)
  const ACCESS_TOKEN = urlParams.get('ACCESS_TOKEN')

  if (ACCESS_TOKEN) {
    setItemWithExpiration('ACCESS_TOKEN', ACCESS_TOKEN, 60)
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
          setSelected(json)
        })
    } catch (e) {
      setError(
        `Could not get songs from server. The following error occurred: ${e}`
      )
    }
  }

  useEffect(() => {
    getAllSongs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {}, [selected])

  const addSong = (song) => {
    postSong(song)
  }
  const removeSong = (songorder) => {
    deleteSong(songorder)
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

  const goToPrev = () => {
    navigate('/welcome')
  }

  const handleNextPage = () => {
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
          <button onClick={goToPrev}>Previous</button>
        </a>
        <a>
          <button onClick={handleNextPage}>Next</button>
        </a>
      </div>
    </div>
  )
}
