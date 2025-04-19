import { useNavigate } from 'react-router-dom'

export function Cassette() {
  const navigate = useNavigate()

  const goToNext = () => {
    navigate('/selection')
  }

  return (
    <article className="cassette">
      <div className="cassetteImage">
        <h1>Coda: personalized playlists for the digital age</h1>
        <p id="cassetteLabel" className="tape" role="link" onClick={goToNext}>
          click here to get started
        </p>
      </div>
    </article>
  )
}
