import Search from './Search.jsx'
export function Selection() {
  selected = []
  const addToSelected = (song) => {
    selected.push(song)
  }
  const removeFromSelected = (id) => {
    // filter through selected and delete song with matching id
  }
  return (
    <Search
      addToSelected={addToSelected}
      removeFromSelected={removeFromSelected}
    />
  )
}
