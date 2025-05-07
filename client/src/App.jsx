import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Annotations } from './components/Annotations'
import { Personalization } from './components/Personalization'
import { Playlist } from './components/Playlist'
import { Selection } from './components/Selection'
import { Welcome } from './components/Welcome'
import { ServerContext } from './components/ServerContext'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export function App() {
  return (
    <ServerContext.Provider value={SERVER_URL}>
      <Router>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/selection" element={<Selection />} />
          <Route path="/annotations" element={<Annotations />} />
          <Route path="/personalization" element={<Personalization />} />
          <Route path="/playlist" element={<Playlist />} />
        </Routes>
      </Router>
    </ServerContext.Provider>
  )
}
