import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SongList } from '/src/components/SongList'

const SONGLIST = [
  {
    songorder: 0,
    spotifyid: 1,
    artist: 'Owl City',
    title: 'How I Became The Sea',
    lyrics: '',
    note: "Hi! I'm a test note."
  }
]

describe('SongList', () => {
  it('renders the SongList component with the correct values from the list prop', () => {
    render(<SongList list={SONGLIST} />)

    expect(
      screen.getByText(`${SONGLIST[0].title} by ${SONGLIST[0].artist}`)
    ).toBeInTheDocument()

    screen.debug()
  })
})
