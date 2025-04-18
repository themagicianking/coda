import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Search from './Search.jsx'
import SongList from './SongList.jsx'
export function Selection() {
  const [selected, setSelected] = useState([])
  const navigate = useNavigate()
  const addSong = (song) => {
    // crypto.randomUUID generates a unique index to use as a key.
    // this is necessary if the same song is selected multiple times:
    // the id given to it from spotify is no longer unique.
    setSelected([
      ...selected,
      { ...song, songID: crypto.randomUUID(), songorder: selected.length }
    ])
    postSong({
      ...song,
      songID: crypto.randomUUID(),
      songorder: selected.length
    })
  }
  const removeSong = (songID) => {
    let newList = selected.filter((song) => songID != song['songID'])
    setSelected(newList)
  }

  async function postSong(song) {
    try {
      fetch('http://localhost:5000/song', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song)
      }).then((res) => {
        console.log(
          `Song posted successfully, server sent response ${res.status}`
        )
      })
    } catch (error) {
      throw new Error(
        `Could not add songs to server. The following error occurred: ${error}`
      )
    }
  }

  async function deleteSong(song) {
    try {
      fetch('http://localhost:5000/song', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: { songid: song.songID }
      }).then((res) => {
        console.log(
          `Song deleted successfully, server sent response ${res.status}`
        )
      })
    } catch (error) {
      throw new Error(
        `Could not delete song from database. The following error occurred: ${error}`
      )
    }
  }

  const handleNextPage = () => {
    navigate('/annotations')
  }

  return (
    <>
      <Search handleSelect={addSong} />
      <SongList list={selected} handleRemove={removeSong} />
      {/* this should link to annotations page when routes are set up */}
      {/* <a role="button"  */}
      <Link role="button" to="/annotations" onClick={handleNextPage}>
        Next
      </Link>
      {/* </a> */}
    </>
  )
}
