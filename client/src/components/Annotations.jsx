import { useEffect, useState } from 'react'
export function Annotations({ orderNum }) {
  const [song, setSong] = useState({})
  const [hasPrevSong, setHasPrevSong] = useState(false)
  const [hasNextSong, setHasNextSong] = useState(false)
  const prevOrderNum = orderNum - 1

  if (prevOrderNum >= 0) {
    setHasPrevSong(true)
  }

  useEffect(() => {
    const sampleSong = {
      songID: 0,
      spotifyID: 19093,
      order: 0,
      artist: 'Indigo Girls',
      title: 'Closer to Fine'
    }
    const nextOrderNum = orderNum + 1
    async function getSong() {
      try {
        // fetch song from server
        console.log('This is when the song will be fetched from the server.')
        console.log(`It should be #${orderNum} in order.`)
        setSong(sampleSong)
      } catch (error) {
        throw new Error(
          `Could not fetch song data from server. The following error occurred: ${error}`
        )
      }
    }

    async function updateNext() {
      try {
        console.log(
          `Checking to see if a song with order ${nextOrderNum} exists.`
        )
        console.log('If the get request returns true, set has next to true.')
        setHasNextSong(true)
      } catch (error) {
        throw new Error(
          `Could not check if next song exists. The following error occurred: ${error}`
        )
      }
    }

    getSong()
    updateNext()
  }, [orderNum])

  return <>Hello World</>
}
