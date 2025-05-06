import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ServerContext } from './ServerContext.jsx'
import { Search } from './Search.jsx'
import { SongList } from './SongList.jsx'
import './selection.css'

export function Selection() {
  const SERVER_URL = useContext(ServerContext)
  const [selected, setSelected] = useState()
  const [error, setError] = useState()
  const navigate = useNavigate()

  // todo: set user visible error messages for posting and deleting songs

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
          console.log(json)
          setSelected(json)
        })
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => {
    getAllSongs()
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
    } catch (error) {
      throw new Error(
        `Could not add song to server. The following error occurred: ${error}`
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
    } catch (error) {
      throw new Error(
        `Could not delete song from database. The following error occurred: ${error}`
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
      <h1 className='title'>Choose Your Songs</h1>
      <div className="lists">
        <Search handleSelect={addSong} />
        {selected ? (
          <SongList list={selected} handleRemove={removeSong} />
        ) : (
          <p>
            Could not get songs from server. The following error occurred:{' '}
            {error}
          </p>
        )}
      </div>
      <div className="nav">
        <button onClick={goToPrev}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  )
}
