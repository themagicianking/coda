import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { NoteInput } from './NoteInput'
import { SongInfo } from './SongInfo'
import { useContext } from 'react'
import { ServerContext } from './ServerContext'
export function Annotations() {
  const SERVER_URL = useContext(ServerContext)
  const [orderNum, setOrderNum] = useState(0)
  const [song, setSong] = useState()
  const [hasPrevSong, setHasPrevSong] = useState(false)
  const [hasNextSong, setHasNextSong] = useState(false)
  const navigate = useNavigate()

  const goToPrevSong = () => {
    putNote()
    getPrevSong()
  }

  const goToNextSong = () => {
    putNote()
    getNextSong()
  }

  const updateNote = (newNote) => {
    setSong({ ...song, note: newNote })
  }

  async function getNextSong() {
    try {
      await fetch(`${SERVER_URL}/nextsong?songorder=${orderNum}`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          return res.json()
        })
        .then((json) => {
          setSong(json)
          setOrderNum(json.songorder)
          return json.songorder
        })
        .then((currentOrderNum) => {
          let nextOrderNum = currentOrderNum + 1
          let prevOrderNum = currentOrderNum - 1
          updatePrev(prevOrderNum)
          updateNext(nextOrderNum)
        })
    } catch (error) {
      setSong(false)
      throw new Error(
        `Could not fetch next song data from server. The following error occurred: ${error}`
      )
    }
  }

  async function getPrevSong() {
    try {
      await fetch(`${SERVER_URL}/prevsong?songorder=${orderNum}`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          return res.json()
        })
        .then((json) => {
          setSong(json)
          setOrderNum(json.songorder)
          setHasNextSong(true)
          return json.songorder
        })
        .then((currentOrderNum) => {
          let nextOrderNum = currentOrderNum + 1
          let prevOrderNum = currentOrderNum - 1
          updatePrev(prevOrderNum)
          updateNext(nextOrderNum)
        })
    } catch (error) {
      setSong(false)
      throw new Error(
        `Could not fetch previous song data from server. The following error occurred: ${error}`
      )
    }
  }

  async function putNote() {
    try {
      await fetch(`${SERVER_URL}/note`, {
        method: 'PUT',
        body: JSON.stringify({ note: song.note, songorder: song.songorder }),
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

  async function updateNext(nextOrderNum) {
    try {
      await fetch(
        `${SERVER_URL}/nextsongexists?songorder=${nextOrderNum}`
      )
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          return res.json()
        })
        .then((json) => {
          console.log(json.exists)
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

  async function updatePrev(prevOrderNum) {
    try {
      await fetch(
        `${SERVER_URL}/prevsongexists?songorder=${prevOrderNum}`
      )
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          return res.json()
        })
        .then((json) => {
          console.log(json.exists)
          if (json.exists) {
            setHasPrevSong(true)
          } else {
            setHasPrevSong(false)
          }
        })
    } catch (error) {
      throw new Error(
        `Could not check if prev song exists. The following error occurred: ${error}`
      )
    }
  }

  useEffect(() => {
    getNextSong()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {}, [orderNum])

  const handlePrevPage = () => {
    putNote()
    navigate('/selection')
  }

  return (
    <>
      <a role="button" onClick={handlePrevPage}>
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
