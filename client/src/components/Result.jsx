export function Result({ song, handleSelect }) {
  const updateSelections = () => {
    handleSelect(song)
  }
  return (
    <li>
      {song.title} by {song.artist}
      <button onClick={updateSelections}>
        Add
      </button>
    </li>
  )
}
