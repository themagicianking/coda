export function NoteInput({ song, updateNote }) {
  const getUserText = (event) => {
    updateNote(event.target.value)
  }

  return (
    <input
      type="text"
      name="note"
      value={song.note}
      onChange={getUserText}
    />
  )
}
