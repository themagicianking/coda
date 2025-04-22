import { useNavigate } from 'react-router-dom'

export function Cassette() {
  const navigate = useNavigate()

  // const goToNext = () => {
  //   navigate('http://localhost:5000/login')
  // }

  return (
    <article className="cassette">
      <div className="cassetteImage">
        <h1>Coda: personalized playlists for the digital age</h1>
        <a href="http://localhost:5000/login" id="cassetteLabel" className="tape" role="link">
          click here to get started
        </a>
      </div>
    </article>
  )
}
