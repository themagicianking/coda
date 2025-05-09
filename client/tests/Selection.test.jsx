import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import { Selection } from '/src/components/Selection'

describe('Selection', () => {
  it('renders the Selection component', () => {
    render(
      <Router>
        <Selection />
      </Router>
    )

    screen.debug()
  })
})
