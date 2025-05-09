import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { NoteInput } from './NoteInput'
import { SongInfo } from './SongInfo'
import { useContext } from 'react'
import { ServerContext } from './ServerContext'
import './annotations.css'

export function Annotations() {
  const SERVER_URL = useContext(ServerContext)
  const [orderNum, setOrderNum] = useState(0)
  const [songs, setSongs] = useState()
  const [note, setNote] = useState('')
  const [error, setError] = useState()
  const [hasPrevSong, setHasPrevSong] = useState(false)
  const [hasNextSong, setHasNextSong] = useState(false)
  const navigate = useNavigate()

  async function getAllSongs() {
    try {
      await fetch(`${SERVER_URL}/allsongs`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          console.log('Got all songs from the server.')
          return res.json()
        })
        .then((json) => {
          setSongs(json)
        })
    } catch (error) {
      throw new Error(
        `Could not get songs from server. The following error occurred: ${error}`
      )
    }
  }

  const goToPrevSong = () => {
    putNote()
    getPrevSong()
  }

  const goToNextSong = () => {
    putNote()
    getNextSong()
  }

  const goToNextPage = () => {
    putNote()
    navigate('/playlist')
  }

  const updateNote = (newNote) => {
    let newSongs = songs.map((song, index) =>
      index == orderNum ? { ...song, note: newNote } : song
    )
    setSongs(newSongs)
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
      setError(error)
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
      await fetch(`${SERVER_URL}/nextsongexists?songorder=${nextOrderNum}`)
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

  async function updatePrev(prevOrderNum) {
    try {
      await fetch(`${SERVER_URL}/prevsongexists?songorder=${prevOrderNum}`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          return res.json()
        })
        .then((json) => {
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
    getAllSongs()
    // getNextSong()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {}, [orderNum])

  const handlePrevPage = () => {
    putNote()
    navigate('/selection')
  }

  return (
    <div className="annotations">
      <h1 className="title">Add Your Notes</h1>
      {songs ? (
        <div className="main">
          <SongInfo song={songs[orderNum]} />
          <NoteInput song={songs[orderNum]} updateNote={updateNote} />
        </div>
      ) : (
        /* <>
          <div className="main">
            <SongInfo song={song} />
            <NoteInput song={song} updateNote={updateNote} />
          </div>
          <div className="annotationNav">
            {hasPrevSong ? (
              <a role="button" onClick={goToPrevSong}>
                <button>Previous Song</button>
              </a>
            ) : (
              <></>
            )}
            {hasNextSong ? (
              <a role="button" onClick={goToNextSong}>
                <button>Next Song</button>
              </a>
            ) : (
              <></>
            )}
          </div>
        </>*/
        <p>Could not fetch song data. The following error occurred: {error}</p>
      )}

      <div className="nav">
        <a role="button" onClick={handlePrevPage}>
          <button>Previous</button>
        </a>

        {/* this should link to personalization page when routes are set up */}
        {/* currently links to playlist view since personalization does not yet exist */}

        <a role="button" onClick={goToNextPage}>
          <button>Next</button>
        </a>
      </div>
    </div>
  )
}
