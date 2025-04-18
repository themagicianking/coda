import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Search from './Search.jsx'
import SongList from './SongList.jsx'
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
          return res.json()
        })
        .then((json) => {
          setSelected(json)
          console.log(json)
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

  const addSong = (song) => {
    setSelected([...selected, { ...song, songorder: selected.length }])
  }
  const removeSong = (songorder) => {
    let newList = selected.filter((song) => songorder != song.songorder)
    setSelected(newList)
  }

  async function postSongs() {
    try {
      fetch('http://localhost:5000/addsongs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selected)
      })
    } catch (error) {
      throw new Error(
        `Could not add songs to server. The following error occurred: ${error}`
      )
    }
  }

  return (
    <>
      <Search handleSelect={addSong} />
      <SongList list={selected} handleRemove={removeSong} />
      {/* this should link to annotations page when routes are set up */}
      <a role="button" onClick={postSongs}>
        Next
      </a>
    </>
  )
}
