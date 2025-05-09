import { useContext, useState } from 'react'
import { ServerContext } from './ServerContext.jsx'
import { Result } from './Result.jsx'
import './selection.css'

function getItemWithExpiration(key) {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) {
    return null // Item doesn't exist
  }

  const item = JSON.parse(itemStr)
  const now = new Date()

  // Check if the item is expired
  if (now.getTime() > item.expiration) {
    localStorage.removeItem(key) // Remove expired item
    return null
  }

  return item.value // Return the value if not expired
}

export function Search({ handleSelect }) {
  const [results, setResults] = useState()
  const [error, setError] = useState()
  const SERVER_URL = useContext(ServerContext)
  const ACCESS_TOKEN = getItemWithExpiration('ACCESS_TOKEN')

  async function getResults(input) {
    try {
      await fetch(
        `${SERVER_URL}/search?input=${input}&ACCESS_TOKEN=${ACCESS_TOKEN}`
      )
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          return res.json()
        })
        .then((json) => {
          console.log(json)
          setResults(json.tracks.items)
        })
    } catch (e) {
      setError(
        `Could not get search results from server. The following error occurred: ${e}`
      )
    }
  }

  function formatSong(song) {
    let artist = song.artists[0].name
    if (song.artists.length > 1) {
      for (let i = 1; i < song.artists.length; i++) {
        artist = artist + ` & ${song.artists[i].name}`
      }
    }

    return {
      spotifyid: song.id,
      title: song.name,
      artist: artist,
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
