import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { Cassette} from '/src/components/Cassette'

// todo: write test to check that url generated for href is correct

describe('Cassette', () => {
  it('renders the Cassette component', () => {
    render(<Cassette />)

    screen.debug()
  })
})