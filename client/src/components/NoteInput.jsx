import './annotations.css'

export function NoteInput({ song, updateNote }) {
  const getUserText = (event) => {
    updateNote(event.target.value)
  }

  return (
    <div>
      <textarea
        type="text"
        name="note"
        placeholder="Add your note here..."
        value={song.note}
        style={{ maxWidth: '100%', height: '50%' }}
        onChange={getUserText}
      />
    </div>
  )
}
