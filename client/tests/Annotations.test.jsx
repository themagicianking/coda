import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import { Annotations } from '/src/components/Annotations'

// todo: write mock API calls once merged in w branch that uses context provider
// todo: write test that checks that songInfo and noteInput are rendered if song exists and error message is rendered if song does not exist
// todo: write test that checks that previous song button is rendered if hasPrevSong is true and that it is not rendered if hasPrevSong is false
// todo: write test that checks that next song button is rendered if hasNextSong is true and that it is not rendered if hasNextSong is false

describe('Annotations', () => {
  it('renders the Annotation component', () => {
    render(
      <Router>
        <Annotations />
      </Router>
    )

    screen.debug()
  })
  it('renders SongInfo and NoteInput', () => {})
})
