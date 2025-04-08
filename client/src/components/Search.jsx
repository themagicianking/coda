import { useState } from 'react'
import Result from './Result.jsx'

export default function Search({ addToSelected, removeFromSelected }) {
  const [results, setResults] = useState([])
  const sampleItems = [
    { id: 0, artist: 'Indigo Girls', title: 'Closer to Fine' },
    { id: 1, artist: 'CHVRCHES', title: 'Empty Threat' },
    { id: 2, artist: 'Twenty One Pilots', title: 'Stressed Out' },
    { id: 3, artist: 'AJR', title: 'Bang' },
    { id: 4, artist: 'cavetown', title: 'This is Home' }
  ]

  async function getResults(input) {
    try {
      await fetch(`https://api.spotify.com/v1/search${input}`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          return res.json()
        })
        .then((json) => {
          setResults(json)
        })
    } catch (error) {
      throw new Error('Could not connect to API.')
    }
  }

  const handleChange = (event) => {
    // let input = event.target.value
    // getResults(input)
    setResults(sampleItems)
  }

  const handleSelectionChange = (isChecked, song) => {
    if (isChecked == true) {
      addToSelected(song)
    } else {
      removeFromSelected(song.id)
    }
  }

  return (
    <article>
      <input
        type="search"
        name="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleChange}
      />
      {results.length > 0 ? (
        <ol>
          {results.map((song) => (
            <Result
              key={song.id}
              song={song}
              handleSelectionChange={handleSelectionChange}
            />
          ))}
        </ol>
      ) : (
        <></>
      )}
    </article>
  )
}
