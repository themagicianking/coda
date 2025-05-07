import './annotations.css'

export function SongInfo({ song }) {
  return (
    <article>
      <h2>
        {song.title} · {song.artist}
      </h2>
      <div className="lyrics">
        <h4>Lyrics</h4>
        {song.lyrics ? (
          <p>{song.lyrics}</p>
        ) : (
          <p>
            No lyrics could be found for this song (yet). This feature is coming
            soon!
          </p>
        )}
      </div>
    </article>
  )
}
