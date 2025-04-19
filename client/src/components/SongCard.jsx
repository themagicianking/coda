export function SongCard({ song }) {
  return (
    <article>
      <h3>
        {song.title} by {song.artist}
      </h3>
      <p>{song.note}</p>
    </article>
  )
}
