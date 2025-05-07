import { useContext, useState } from 'react'
import { ServerContext } from './ServerContext.jsx'
import { Result } from './Result.jsx'
import './selection.css'

function getCookie(cname) {
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export function Search({ handleSelect }) {
  const [results, setResults] = useState()
  const [error, setError] = useState()
  const ACCESS_TOKEN = getCookie('ACCESS_TOKEN')
  const SERVER_URL = useContext(ServerContext)

  async function getResults(input) {
    try {
      await fetch(
        `${SERVER_URL}/search?input=${input}&ACCESS_TOKEN= ${ACCESS_TOKEN}`
      )
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          return res.json()
        })
        .then((json) => {
          try {
            setResults(json.tracks.items)
          } catch {
            setError('Could not retrieve Spotify search results.')
          }
        })
    } catch (e) {
      setError(`Could not connect to API. The following error occurred: ${e}`)
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
      <h2>Search Spotify</h2>
      <input
        type="search"
        name="search"
        autoComplete="off"
        placeholder="Search"
        aria-label="Search"
        onChange={handleSearch}
      />
      {results ? (
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
        <p>{error}</p>
      )}
    </article>
  )
}
