import { useState } from 'react'
import Search from './Search.jsx'
import SongList from './SongList.jsx'
export function Selection() {
  const [selected, setSelected] = useState([])
  const addToSelected = (song) => {
    // crypto.randomUUID generates a unique index to use as a key.
    // this is necessary if the same song is selected multiple times:
    // the id given to it from spotify is no longer unique.
    setSelected([...selected, { ...song, songID: crypto.randomUUID() }])
  }
  const handleRemove = (songID) => {
    let newList = selected.filter((song) => songID != song['songID'])
    setSelected(newList)
  }

  return (
    <>
      <Search addToSelected={addToSelected} />
      <SongList list={selected} handleRemove={handleRemove} />
    </>
  )
}
