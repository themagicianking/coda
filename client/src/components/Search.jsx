import { useState } from 'react'

export function Search() {
  const [results, setResults] = useState([])
  const handleChange = () => {
    setResults(['example'])
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
