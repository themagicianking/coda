import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Result } from '/src/components/Result'

const SONG = {
  songorder: 0,
  spotifyid: 1,
  artist: 'Owl City',
  title: 'How I Became The Sea',
  lyrics: '',
  note: "Hi! I'm a test note."
}

describe('Result', () => {
  it('renders the Result component with the correct with the correct values from the song prop', () => {
    render(<Result song={SONG} />)
    expect(
      screen.getByText(`${SONG.title} by ${SONG.artist}`)
    ).toBeInTheDocument()

    screen.debug()
  })
})
