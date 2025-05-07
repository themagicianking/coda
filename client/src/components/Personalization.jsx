import { useNavigate } from 'react-router-dom'

export function Personalization() {
  const navigate = useNavigate()

  const handlePrevPage = () => {
    navigate('/annotations')
  }
  const goToNextPage = () => {
    navigate('/playlist')
  }

  return (
    <div>
      <h1>Add Your Personalization</h1>
      <div>
        <form id="personalization">
          <label htmlFor="Playlist Name">Playlist Name</label>
          <input type="text" name="Playlist Name"></input>
          <label htmlFor="Sender">Sender</label>
          <input type="text" name="Sender"></input>
          <label htmlFor="Recipient">Recipient</label>
          <input type="text" name="Recipient"></input>
          <label htmlFor="Description">Description</label>
          <textarea name="Playlist Name" form="personalization"></textarea>
        </form>
      </div>
      <div className="nav">
        <a role="button" onClick={handlePrevPage}>
          <button>Previous</button>
        </a>
        <a role="button" onClick={goToNextPage}>
          <button>Submit</button>
        </a>
      </div>
    </div>
  )
}
