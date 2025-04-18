export default function Song({ song, handleRemove }) {
  const updateSelections = () => {
    handleRemove(song.songorder)
  }
  return (
    <div>
      <li>
        {song.title} by {song.artist}
        <button style={{ marginLeft: '10px' }} onClick={updateSelections}>
          Remove
        </button>
      </li>
    </div>
  )
}
