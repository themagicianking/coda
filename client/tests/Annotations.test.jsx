import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import { Annotations } from '/src/components/Annotations'

describe('Annotations', () => {
  it('renders the Annotation component', () => {
    render(
      <Router>
        <Annotations />
      </Router>
    )

    screen.debug()
  })
})
