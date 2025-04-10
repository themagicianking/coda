import Search from './Search.jsx'
import SongList from './SongList.jsx'
export function Selection() {
  let selected = []
  const addToSelected = (song) => {
    selected.push(song)
    console.log(selected)
  }
  return (
    <>
      <Search addToSelected={addToSelected} />
      <SongList />
    </>
  )
}
