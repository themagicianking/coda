export function SongInfo({ song }) {
  return (
    <article>
      <p>
        {song.title} by {song.artist}
      </p>
      <p>{song.lyrics}</p>
    </article>
  )
}
