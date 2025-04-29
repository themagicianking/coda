import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { AboutApp } from '/src/components/AboutApp'

describe('AboutApp', () => {
  it('renders the App component', () => {
    render(<AboutApp />)

    screen.debug()
  })
})
