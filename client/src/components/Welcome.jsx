import { AboutApp } from './AboutApp'
import { Cassette } from './Cassette'
import { Credits } from './Credits'
import './welcome.css'

export function Welcome() {
  return (
    <div className='welcome'>
      <AboutApp />
      <Cassette />
      <Credits />
    </div>
  )
}
