import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ServerContext } from './ServerContext.jsx'
import Search from './Search.jsx'
import SongList from './SongList.jsx'
export function Selection() {
  const SERVER_URL = useContext(ServerContext)
  const [selected, setSelected] = useState([])
  const navigate = useNavigate()

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
    } catch (error) {
      throw new Error(
        `Could not get songs from server. The following error occurred: ${error}`
      )
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
    <>
      <button onClick={goToPrev}>Previous</button>
      <Search handleSelect={addSong} />
      <SongList list={selected} handleRemove={removeSong} />
      <button onClick={handleNextPage}>Next</button>
    </>
  )
}
