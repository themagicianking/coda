import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SongInfo } from '/src/components/SongInfo'

const SONG = {
  songorder: 0,
  spotifyid: 1,
  artist: 'Owl City',
  title: 'How I Became The Sea',
  lyrics: 'June was the lobster shell / I dug by hand',
  note: "Hi! I'm a test note."
}

describe('SongInfo', () => {
  it('renders the SongInfo component with the correct values from the song prop', () => {
    render(<SongInfo song={SONG} />)
    expect(
      screen.getByText(`${SONG.title} by ${SONG.artist}`)
    ).toBeInTheDocument()

    expect(screen.getByText(SONG.lyrics)).toBeInTheDocument()

    screen.debug()
  })
})
