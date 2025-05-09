import './playlist.css'

export function PlaylistDetails({ details }) {
  return (
    <div className="title">
      <h1>{details.title}</h1>
      <h2>
        From {details.sender} to {details.recipient}
      </h2>
      <p className="description">{details.description}</p>
    </div>
  )
}
