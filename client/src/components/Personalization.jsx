import { useContext } from 'react'
import { ServerContext } from './ServerContext.jsx'
import { useNavigate } from 'react-router-dom'

export function Personalization() {
  const SERVER_URL = useContext(ServerContext)
  const navigate = useNavigate()

  const handlePrevPage = () => {
    navigate('/annotations')
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    const FORM_DATA = {
      name: event.target.name.value,
      sender: event.target.sender.value,
      recipient: event.target.recipient.value,
      decription: event.target.description.value
    }

    createPlaylist(FORM_DATA)

    // navigate('/playlist')
  }

  async function createPlaylist(personalization) {
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
