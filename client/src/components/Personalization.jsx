import { useContext } from 'react'
import { ServerContext } from './ServerContext.jsx'
import { useNavigate } from 'react-router-dom'

function getCookie(cname) {
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export function Personalization() {
  const SERVER_URL = useContext(ServerContext)
  const ACCESS_TOKEN = getCookie('ACCESS_TOKEN')
  const PLAYLISTID = getCookie('playlistid')
  const navigate = useNavigate()

  const handlePrevPage = () => {
    navigate('/annotations')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const FORM_DATA = {
      id: PLAYLISTID,
      name: event.target.name.value,
      sender: event.target.sender.value,
      recipient: event.target.recipient.value,
      description: event.target.description.value
    }

    createPlaylistPersonalization(FORM_DATA)
    getUserId(FORM_DATA)

    // navigate('/playlist')
  }

  async function createPlaylistPersonalization(personalization) {
    try {
      await fetch(`${SERVER_URL}/playlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personalization)
      }).then((res) => {
        if (res.status >= 400) {
          throw res.status
        }
        console.log(
          `Playlist posted successfully, server sent response ${res.status}`
        )
      })
    } catch (error) {
      console.log(
        `Could not post playlist. The following error occurred: ${error}`
      )
    }
  }

  async function getUserId(personalization) {
    try {
      await fetch(`${SERVER_URL}/userid?ACCESS_TOKEN=${ACCESS_TOKEN}`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          return res.json()
        })
        .then((json) => {
          createPlaylist(json.id, personalization)
        })
    } catch (error) {
      console.log(
        `Could not get userid. The following error occurred: ${error}`
      )
    }
  }

  async function createPlaylist(userid, personalization) {
    try {
      await fetch(`${SERVER_URL}/spotifyplaylist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userid: userid,
          personalization: personalization,
          ACCESS_TOKEN: ACCESS_TOKEN
        })
      })
        .then((res) => {
          if (res.status >= 400) {
            throw res.status
          }
          return res.json()
        })
        .then((json) => {
          console.log(
            `Successfully created playlist, server returned response ${json}`
          )
        })
    } catch (error) {
      console.log(
        `Could not create playlist. The following error occurred: ${error}`
      )
    }
  }

  return (
    <div>
      <h1>Add Your Personalization</h1>
      <form id="personalization" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Playlist Name">Playlist Name</label>
          <input type="text" name="Playlist Name" id="name"></input>
          <label htmlFor="Sender">Sender</label>
          <input type="text" name="Sender" id="sender"></input>
          <label htmlFor="Recipient">Recipient</label>
          <input type="text" name="Recipient" id="recipient"></input>
          <label htmlFor="Description">Description</label>
          <textarea
            name="Playlist Name"
            form="personalization"
            id="description"
          ></textarea>
        </div>
        <div className="nav">
          <a role="button" onClick={handlePrevPage}>
            <button>Previous</button>
          </a>
          <input type="submit"></input>
          {/* <a role="button" onClick={goToNextPage}>
            <button>Submit</button>
          </a> */}
        </div>
      </form>
    </div>
  )
}
