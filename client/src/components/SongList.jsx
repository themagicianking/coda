import Song from './Song.jsx'

export default function SongList({ list, handleRemove }) {

  return (
    <article>
      {list ? (
        <ol>
          {list.map((song) => (
            <Song key={song.songid} song={song} handleRemove={handleRemove} />
          ))}
        </ol>
      ) : (
        <></>
      )}
    </article>
  )
}
