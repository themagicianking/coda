export default function Result({ song, handleSelectionChange }) {
  const onChange = (event) => {
    let isChecked = event.target.checked
    handleSelectionChange(isChecked, song)
  }
  return (
    <div>
      <li>
        {song.title} by {song.artist}
        <input
          type="checkbox"
          style={{ marginLeft: '10px' }}
          onChange={onChange}
        ></input>
      </li>
    </div>
  )
}
