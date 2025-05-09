import { Song } from './Song.jsx'
import "./selection.css"

export function SelectedSongList({ list, handleRemove }) {
  return (
    <article>
      <h2>Selected Songs</h2>
      {list.length > 0 ? (
        <ol className='selected'>
          {list.map((song) => (
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
