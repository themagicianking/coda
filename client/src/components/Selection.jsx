import { useState } from 'react'
import Search from './Search.jsx'
import SongList from './SongList.jsx'
export function Selection() {
  const [selected, setSelected] = useState([])
  const addToSelected = (song) => {
    let newSelected = selected.concat([song])
    setSelected(newSelected)
    console.log(selected)
  }

  return (
    <>
      <Search addToSelected={addToSelected} />
      <SongList key={selected} list={selected} />
    </>
  )
}
