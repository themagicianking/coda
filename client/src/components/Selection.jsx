import { useState } from 'react'
import Search from './Search.jsx'
import SongList from './SongList.jsx'
export function Selection() {
  const [selected, setSelected] = useState([])
  const addToSelected = (song) => {
    setSelected([...selected, {...song, songID: crypto.randomUUID() }])
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
