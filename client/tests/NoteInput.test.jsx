import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { NoteInput } from '/src/components/NoteInput'

const SONG = {
  songorder: 0,
  spotifyid: 1,
  artist: 'Owl City',
  title: 'How I Became The Sea',
  lyrics: '',
  note: "Hi! I'm a test note."
}

describe('NoteInput', () => {
  it('renders the NoteInput component with the correct note value', () => {
    render(<NoteInput song={SONG} />)
    expect(screen.getByDisplayValue(SONG.note)).toBeInTheDocument()

    screen.debug()
  })
})
