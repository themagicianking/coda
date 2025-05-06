import { useContext, useState } from 'react'
import { ServerContext } from './ServerContext.jsx'
import { Result } from './Result.jsx'
import './selection.css'

export function Search({ handleSelect }) {
  const [results, setResults] = useState([])
  const SERVER_URL = useContext(ServerContext)

  async function getResults(input) {
    try {
      await fetch(`${SERVER_URL}/search?input=${input}`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          return res.json()
        })
        .then((json) => {
          setResults(json.tracks.items)
        })
    } catch (error) {
      throw new Error(
        `Could not connect to API. The following error occurred: ${error}`
      )
    }
  }

  function formatSong(song) {
    // todo: incorporate songs with multiple artists
    // todo: figure out if it's possible to get lyrics
    return {
      spotifyid: song.id,
      title: song.name,
      artist: song.artists[0].name,
      note: ''
    }
  }

  const handleSearch = (event) => {
    let input = event.target.value
    getResults(input)
  }

  return (
    <article>
      <input
        type="search"
        name="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleSearch}
      />
      {results.length > 0 ? (
        <ol className="results">
          {results.map((song) => (
            <Result
              key={song.id}
              song={formatSong(song)}
              handleSelect={handleSelect}
            />
          ))}
        </ol>
      ) : (
        <></>
      )}
    </article>
  )
}
