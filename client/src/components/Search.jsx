import { useState } from 'react'

export function Search() {
  const [results, setResults] = useState([])

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
    let input = event.target.value
    getResults(input)
  }

  return (
    <>
      <input
        type="search"
        name="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleChange}
      />
      <ul>
        {results.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </>
  )
}
