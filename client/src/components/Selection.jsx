import Search from './Search.jsx'
export function Selection() {
  let selected = []
  const addToSelected = (song) => {
    selected.push(song)
    console.log(selected)
  }
  const removeFromSelected = (id) => {
    console.log(selected)
    // filter through selected and delete song with matching id
  }
  return (
    <Search
      addToSelected={addToSelected}
      removeFromSelected={removeFromSelected}
    />
  )
}
