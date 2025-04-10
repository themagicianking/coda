export default function Song({ song, handleRemove }) {
  const onClick = () => {
    handleRemove(song.songID)
  }
  return (
    <div>
      <li>
        {song.title} by {song.artist}
        <button style={{ marginLeft: '10px' }} onClick={onClick}>
          Remove
        </button>
      </li>
    </div>
  )
}
