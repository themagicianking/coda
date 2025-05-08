import './playlist.css'

export function SongCard({ song }) {
  return (
    <li className="song">
        <h3>
          {song.title} by {song.artist}
        </h3>
        <p>{song.note}</p>
    </li>
  )
}
