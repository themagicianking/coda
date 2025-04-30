import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { Welcome } from '/src/components/Welcome'

describe('Welcome', () => {
  it('renders the Welcome component', () => {
    render(<Welcome />)

    screen.debug()
  })
})
