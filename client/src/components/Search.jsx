import { useContext, useState } from 'react'
import { ServerContext } from './ServerContext.jsx'
import { Result } from './Result.jsx'
import { fetchWithOAuth } from '../utils/fetchWithOAuth.js'
import './selection.css'

export function Search({ handleSelect }) {
  const [results, setResults] = useState()
  const [input, setInput] = useState()
  const [error, setError] = useState()
  const SERVER_URL = useContext(ServerContext)

  async function getResults(accessToken) {
    try {
      await fetch(
        `${SERVER_URL}/search?input=${input}&ACCESS_TOKEN=${accessToken}`
      )
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          return res.json()
        })
        .then((json) => {
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

    try {
      if (song.album.images[1].url === undefined) {
        song.album.images[1].url = song.album.images[0].url
      }
    } catch (e) {
      console.error('Error fetching album image:', e)
      song.album.images[1].url = ''
    }

    return {
      uri: song.uri,
      title: song.name,
      artist: artist,
      image: song.album.images[1].url,
      note: ''
    }
  }

  const handleSearch = (event) => {
    setInput(event.target.value)
    fetchWithOAuth(getResults, SERVER_URL)
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
