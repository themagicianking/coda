import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Search from './Search.jsx'
import SongList from './SongList.jsx'
import './selection.css'

export function Selection() {
  const [selected, setSelected] = useState([])
  const navigate = useNavigate()

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

  useEffect(() => {
    console.log('THE SELECTED SONGS CHANGED')
  }, [selected])

  const addSong = (song) => {
    postSong(song)
  }
  const removeSong = (songorder) => {
    deleteSong(songorder)
  }

  async function postSong(song) {
    try {
      fetch('http://localhost:5000/song', {
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
      fetch('http://localhost:5000/song', {
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
      {/* Photo by <a href="https://unsplash.com/@enginakyurt?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">engin akyurt</a> on <a href="https://unsplash.com/photos/a-black-crumpled-paper-background-with-a-black-background-Ya-IIca3PjM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a> */}
    </>
  )
}
