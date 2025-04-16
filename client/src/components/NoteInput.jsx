export function NoteInput({ song, updateNote }) {
  const getNoteValue = (event) => {
    updateNote(event.target.value)
  }

  return (
    <input
      type="text"
      name="note"
      value={song.note}
      onChange={getNoteValue}
    />
  )
}
