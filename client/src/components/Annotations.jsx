import { useEffect, useState } from 'react'
import { NoteInput } from './NoteInput'
import { SongInfo } from './SongInfo'
export function Annotations() {
  const [orderNum, setOrderNum] = useState(0)
  const [song, setSong] = useState()
  const [hasPrevSong, setHasPrevSong] = useState(false)
  const [hasNextSong, setHasNextSong] = useState(false)

  const goToPrevSong = () => {
    const prevOrderNum = orderNum - 1
    putNote().then(() => setOrderNum(prevOrderNum))
  }

  const goToNextSong = () => {
    const nextOrderNum = orderNum + 1
    putNote().then(() => setOrderNum(nextOrderNum))
  }

  const updateNote = (newNote) => {
    setSong({ ...song, note: newNote })
  }

  async function putNote() {
    try {
      await fetch('http://localhost:5000/note', {
        method: 'PUT',
        body: JSON.stringify({ note: song.note, songid: song.songid }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          return res.json()
        })
        .then((json) => console.log(`Server response: ${json}`))
    } catch (error) {
      throw new Error(
        `Could not update server. The following error occurred: ${error}`
      )
    }
  }

  useEffect(() => {
    async function getSong() {
      try {
        await fetch(`http://localhost:5000/song?songorder=${orderNum}`)
          .then((res) => {
            if (res.status >= 400) {
              throw res.status
            }
            return res.json()
          })
          .then((json) => {
            setSong(json)
            if (json.songorder > 0) {
              setHasPrevSong(true)
            }
          })
      } catch (error) {
        setSong(false)
        throw new Error(
          `Could not fetch song data from server. The following error occurred: ${error}`
        )
      }
    }

    const updatePrev = () => {
      if (orderNum <= 0) {
        setHasPrevSong(false)
      } else {
        setHasPrevSong(true)
      }
    }

    async function updateNext() {
      try {
        await fetch(
          `http://localhost:5000/songexists?songorder=${orderNum + 1}`
        )
          .then((res) => {
            if (res.status >= 400) {
              throw res.status
            }
            return res.json()
          })
          .then((json) => {
            if (json.exists) {
              setHasNextSong(true)
            } else {
              setHasNextSong(false)
            }
          })
      } catch (error) {
        throw new Error(
          `Could not check if next song exists. The following error occurred: ${error}`
        )
      }
    }

    getSong()
    updatePrev()
    updateNext()
  }, [orderNum])

  return (
    <>
      {/* this should link to selection page when routes are set up */}
      <a role="button" onClick={putNote}>
        Previous
      </a>
      {song ? (
        <>
          <SongInfo song={song} />
          <NoteInput song={song} updateNote={updateNote} />
        </>
      ) : (
        <></>
      )}
      {hasPrevSong ? (
        <a role="button" onClick={goToPrevSong}>
          Previous Song
        </a>
      ) : (
        <></>
      )}
      {hasNextSong ? (
        <a role="button" onClick={goToNextSong}>
          Next Song
        </a>
      ) : (
        <></>
      )}
      {/* this should link to personalization page when routes are set up */}
      <a role="button" onClick={putNote}>
        Next
      </a>
    </>
  )
}
