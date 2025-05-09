import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { Search } from '/src/components/Search'

describe('Search', () => {
  it('renders the Search component', () => {
    render(<Search />)

    screen.debug()
  })
})
