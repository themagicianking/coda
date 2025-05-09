import { SongCard } from './SongCard'
import './playlist.css'

export function PlaylistSongList({ songs }) {
  return (
    <ol className="songs">
      {songs.map((song) => (
        <SongCard key={song.songorder} song={song} />
      ))}
    </ol>
  )
}
