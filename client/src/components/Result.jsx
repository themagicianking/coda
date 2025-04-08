export default function Result({ artist, title }) {
  return (
    <div>
      <li>
        {title} by {artist}
        <input type="checkbox" style={{ marginLeft: '10px' }}></input>
      </li>
    </div>
  )
}
