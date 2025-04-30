export function Result({ song, handleSelect }) {
  const updateSelections = () => {
    handleSelect(song)
  }
  return (
    <div>
      <li>
        {song.title} by {song.artist}
        <button style={{ marginLeft: '10px' }} onClick={updateSelections}>
          Add
        </button>
      </li>
    </div>
  )
}
