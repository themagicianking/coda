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
