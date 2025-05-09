import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Song } from '/src/components/Song'

const SONG = {
  songorder: 0,
  spotifyid: 1,
  artist: 'Owl City',
  title: 'How I Became The Sea',
  lyrics: '',
  note: "Hi! I'm a test note."
}

describe('Song', () => {
  it('renders the Song component with the correct values from the song prop', () => {
    render(<Song song={SONG} />)
    expect(
      screen.getByText(`${SONG.title} by ${SONG.artist}`)
    ).toBeInTheDocument()

    screen.debug()
  })
})
