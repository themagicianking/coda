import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SelectedSongList } from '/src/components/SelectedSongList'

const SELECTED_SONG_LIST = [
  {
    songorder: 0,
    spotifyid: 1,
    artist: 'Owl City',
    title: 'How I Became The Sea',
    lyrics: '',
    note: "Hi! I'm a test note."
  }
]

describe('SelectedSongList', () => {
  it('renders the SelectedSongList component with the correct values from the list prop', () => {
    render(<SelectedSongList list={SELECTED_SONG_LIST} />)

    expect(
      screen.getByText(
        `${SELECTED_SONG_LIST[0].title} by ${SELECTED_SONG_LIST[0].artist}`
      )
    ).toBeInTheDocument()

    screen.debug()
  })
})
