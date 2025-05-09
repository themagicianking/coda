export function Song({ song, handleRemove }) {
  const updateSelections = () => {
    handleRemove(song.songorder)
  }
  return (
    <li>
      <img src={song.image} alt="Album cover" />
      <p>
        {song.title} by {song.artist}
      </p>
      <button onClick={updateSelections}>Remove</button>
    </li>
  )
}
