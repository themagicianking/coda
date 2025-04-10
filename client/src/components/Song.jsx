export default function Song({ song }) {
  return (
    <div>
      <li>
        {song.title} by {song.artist}
        <button style={{ marginLeft: '10px' }}>Remove</button>
      </li>
    </div>
  )
}
