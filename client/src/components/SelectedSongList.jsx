import { Song } from './Song.jsx'
import './selection.css'

export function SelectedSongList({ songs, handleRemove }) {
  return (
    <article>
      <h2>Selected Songs</h2>
      {songs.length > 0 ? (
        <ol className="selected">
          {songs.map((song) => (
            <Song
              key={song.songorder}
              song={song}
              handleRemove={handleRemove}
            />
          ))}
        </ol>
      ) : (
        <p>None yet!</p>
      )}
    </article>
  )
}
