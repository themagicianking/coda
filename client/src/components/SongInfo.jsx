import './annotations.css'

export function SongInfo({ song }) {
  return (
    <article>
      <div className="header">
        {song.image ? (
          <img src={song.image}></img>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 48 48"
          >
            <path d="M38.5,6h-29C7.57,6,6,7.57,6,9.5v29C6,40.43,7.57,42,9.5,42h29c1.93,0,3.5-1.57,3.5-3.5v-29C42,7.57,40.43,6,38.5,6z M33,30c0,2-1,4-4,4h-1c-0.86,0-3-1-3-3s1.39-3,3-3h1c0.96,0,2-0.51,2-1.46V17l-10,2v13c0,2.37-2.12,4-4.52,4h-0.44 c-0.86,0-1.68-0.36-2.26-0.99c-0.57-0.62-0.85-1.47-0.76-2.32c0.14-1.51,1.53-2.69,3.14-2.69h1.19c0.95,0,1.74-0.77,1.74-1.71 V15.73c0-0.82,0.6-1.54,1.41-1.68l10.95-2.02c0.38-0.08,0.78,0.02,1.08,0.27c0.3,0.24,0.47,0.6,0.47,0.99V30z"></path>
          </svg>
        )}
        <h2>
          {song.title} · {song.artist}
        </h2>
      </div>
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
