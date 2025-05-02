import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { Search } from '/src/components/Search'

// todo: write mock API calls test

describe('Search', () => {
  it('renders the Search component', () => {
    render(<Search />)

    screen.debug()
  })
})
