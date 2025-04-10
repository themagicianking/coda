import Song from './Song.jsx'

export default function SongList({ list }) {
  return (
    <article>
      {list ? (
        <ol>
          {list.map((song) => (
            <Song song={song} />
          ))}
        </ol>
      ) : (
        <></>
      )}
    </article>
  )
}
