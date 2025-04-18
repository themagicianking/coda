import { useState } from 'react'
import Result from './Result.jsx'

export default function Search({ handleSelect }) {
  const [results, setResults] = useState([])
  const sampleItems = [
    {
      spotifyid: 0,
      artist: 'Indigo Girls',
      title: 'Closer to Fine',
      lyrics: '',
      note: ''
    },
    {
      spotifyid: 1,
      artist: 'CHVRCHES',
      title: 'Empty Threat',
      lyrics: '',
      note: ''
    },
    {
      spotifyid: 2,
      artist: 'Twenty One Pilots',
      title: 'Stressed Out',
      lyrics: '',
      note: ''
    },
    { spotifyid: 3, artist: 'AJR', title: 'Bang', lyrics: '', note: '' },
    {
      spotifyid: 4,
      artist: 'cavetown',
      title: 'This is Home',
      lyrics: '',
      note: ''
    }
  ]

  // async function getResults(input) {
  //   try {
  //     await fetch(`https://api.spotify.com/v1/search${input}`)
  //       .then((res) => {
  //         if (res.status >= 400) {
  //           throw res.status
  //         }
  //         return res.json()
  //       })
  //       .then((json) => {
  //         setResults(json)
  //       })
  //   } catch (error) {
  //     throw new Error(
  //       `Could not connect to API. The following error occurred: ${error}`
  //     )
  //   }
  // }

  const handleSearch = () => {
    // let input = event.target.value
    // getResults(input)
    setResults(sampleItems)
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
        <ol>
          {results.map((song) => (
            <Result
              key={song.spotifyid}
              song={song}
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
