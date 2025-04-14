export function NoteInput({ note, updateNote }) {
  const getNoteValue = (event) => {
    updateNote(event.target.value)
  }

  return (
    <input
      type="text"
      name="note"
      defaultValue={note}
      onChange={getNoteValue}
    />
  )
}
