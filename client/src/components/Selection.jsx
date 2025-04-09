import Search from './Search.jsx'
export function Selection() {
  let selected = []
  const addToSelected = (song) => {
    selected.push(song)
    console.log(selected)
  }
  // const removeFromSelected = (id) => {
  //   selected = selected.filter((song) => song.id != id)
  //   console.log(selected)
  // }
  return (
    <Search
      addToSelected={addToSelected}
      // removeFromSelected={removeFromSelected}
    />
  )
}
