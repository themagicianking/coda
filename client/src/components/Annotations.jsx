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
  const [error, setError] = useState()
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
    } catch (e) {
      setError(
        `Could not get songs from server. The following error occurred: ${e}`
      )
    }
  }

  async function putNote() {
    try {
      await fetch(`${SERVER_URL}/note`, {
        method: 'PUT',
        body: JSON.stringify({
          note: songs[orderNum].note,
          songorder: songs[orderNum].songorder
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          return res.json()
        })
        .then((json) =>
          console.log(`Note updated successfully. Server response: ${json}`)
        )
    } catch (e) {
      console.log(`Could not update server. The following error occurred: ${e}`)
    }
  }

  const updateNote = (newNote) => {
    let newSongs = songs.map((song, index) =>
      index == orderNum ? { ...song, note: newNote } : song
    )
    setSongs(newSongs)
  }

  const goToPrevSong = () => {
    putNote()
    setOrderNum(orderNum - 1)
  }

  const goToNextSong = () => {
    putNote()
    setOrderNum(orderNum + 1)
  }

  const goToPrevPage = () => {
    putNote()
    navigate('/selection')
  }

  const goToNextPage = () => {
    putNote()
    navigate('/playlist')
  }

  useEffect(() => {
    getAllSongs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {}, [orderNum])

  return (
    <div className="annotations">
      <h1 className="title">Add Your Notes</h1>
      {songs ? (
        <>
          <div className="main">
            <SongInfo song={songs[orderNum]} />
            <NoteInput song={songs[orderNum]} updateNote={updateNote} />
          </div>
          <div className="songnav">
            {orderNum == 0 ? (
              <></>
            ) : (
              <a role="button" onClick={goToPrevSong}>
                <button>Previous Song</button>
              </a>
            )}
            {orderNum + 2 > songs.length ? (
              <></>
            ) : (
              <a role="button" onClick={goToNextSong}>
                <button>Next Song</button>
              </a>
            )}
          </div>
        </>
      ) : (
        <p>{error}</p>
      )}

      <div className="nav">
        <a role="button" onClick={goToPrevPage}>
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
