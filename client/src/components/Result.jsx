import './selection.css'

export function Result({ song, handleSelect }) {
  const updateSelections = () => {
    handleSelect(song)
  }
  return (
    <li>
      <img src={song.image} alt="Album cover" />
      <p>
        {song.title} by {song.artist}
      </p>
      <button onClick={updateSelections}>Add</button>
    </li>
  )
}
