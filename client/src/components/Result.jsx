export default function Result({ artist, title }) {
  return (
    <div>
      <li>
        {title} by {artist}
        <input type="checkbox"></input>
      </li>
    </div>
  )
}
