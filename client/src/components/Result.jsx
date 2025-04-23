export default function Result({ song, handleSelect }) {
  const updateSelections = () => {
    handleSelect(song)
  }
  return (
    <div>
      <li>
        {song.name} by {song.artists[0].name}
        <button style={{ marginLeft: '10px' }} onClick={updateSelections}>
          Add
        </button>
      </li>
    </div>
  )
}
