export function Song({ song, handleRemove }) {
  const updateSelections = () => {
    handleRemove(song.songorder)
  }
  return (
    <li>
      {song.title} by {song.artist}
      <button onClick={updateSelections}>Remove</button>
    </li>
  )
}
