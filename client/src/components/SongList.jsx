import Song from './Song.jsx'

export default function SongList({ list }) {
  return (
    <article>
      {list ? (
        <ol>
          {list.map((song) => (
            <Song key={song.songID} song={song} />
          ))}
        </ol>
      ) : (
        <></>
      )}
    </article>
  )
}
