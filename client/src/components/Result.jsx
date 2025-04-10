export default function Result({ song, handleSelection }) {
  const onClick = () => {
    handleSelection(song)
  }
  return (
    <div>
      <li>
        {song.title} by {song.artist}
        <button style={{ marginLeft: '10px' }} onClick={onClick}>
          Add
        </button>
      </li>
    </div>
  )
}
