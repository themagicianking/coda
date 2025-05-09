import { useContext, useState } from 'react'
import { ServerContext } from './ServerContext.jsx'
import { Result } from './Result.jsx'
import './selection.css'

function setItemWithExpiration(key, value, expirationInMinutes) {
  const now = new Date()
  const item = {
    value: value,
    expiration: now.getTime() + expirationInMinutes * 60 * 1000
  }
  localStorage.setItem(key, JSON.stringify(item))
}

function getItemWithExpiration(key) {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const now = new Date()

  if (now.getTime() > item.expiration) {
    localStorage.removeItem(key)
    return null
  }

  return item.value
}

export function Search({ handleSelect }) {
  const [results, setResults] = useState()
  const [error, setError] = useState()
  const SERVER_URL = useContext(ServerContext)

  async function getResults(input) {
    const ACCESS_TOKEN = await getValidAccessToken()
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
          setResults(json.tracks.items)
        })
    } catch (e) {
      setError(
        `Could not get search results from server. The following error occurred: ${e}`
      )
    }
  }

  async function getValidAccessToken() {
    if (!getItemWithExpiration('ACCESS_TOKEN')) {
      const refreshToken = getItemWithExpiration('REFRESH_TOKEN')
      if (refreshToken) {
        return await refreshAccessToken(refreshToken)
      } else {
        console.error('No refresh token available.')
        return null
      }
    }
    return getItemWithExpiration('ACCESS_TOKEN')
  }

  async function refreshAccessToken(refreshToken) {
    try {
      const response = await fetch(`${SERVER_URL}/refresh_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ REFRESH_TOKEN: refreshToken })
      })

      if (!response.ok) {
        throw new Error('Failed to refresh access token.')
      }

      const data = await response.json()
      setItemWithExpiration('ACCESS_TOKEN', data.ACCESS_TOKEN)
      return data.ACCESS_TOKEN
    } catch (error) {
      console.error('Error refreshing access token:', error)
      return null
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

    console.log(song)

    return {
      uri: song.uri,
      title: song.name,
      artist: artist,
      image: song.album.images[1].url,
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
