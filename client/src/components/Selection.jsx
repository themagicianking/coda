import { useState } from 'react'
import Search from './Search.jsx'
import SongList from './SongList.jsx'
export function Selection() {
  const [selected, setSelected] = useState([])
  const addSong = (song) => {
    // crypto.randomUUID generates a unique index to use as a key.
    // this is necessary if the same song is selected multiple times:
    // the id given to it from spotify is no longer unique.
    setSelected([
      ...selected,
      { ...song, songID: crypto.randomUUID(), songorder: selected.length }
    ])
  }
  const removeSong = (songID) => {
    let newList = selected.filter((song) => songID != song['songID'])
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
