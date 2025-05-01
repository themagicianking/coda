import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { Credits } from '/src/components/Credits'

describe('Credits', () => {
  it('renders the Credits component', () => {
    render(<Credits />)

    screen.debug()
  })
})
