import { useContext } from 'react'
import { ServerContext } from './ServerContext'

export function Cassette() {
  const SERVER_URL = useContext(ServerContext)

  return (
    <article className="cassette">
      <div className="cassetteImage">
        <div className="title">
          <h1>CODA</h1>
          <p>personalized playlists for the digital age</p>
        </div>
        <a
          href={`${SERVER_URL}/login`}
          id="cassetteLabel"
          className="tape"
          role="link"
        >
          click here to get started
        </a>
      </div>
    </article>
  )
}
